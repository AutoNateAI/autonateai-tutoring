import {getAuth} from 'firebase-admin/auth';
import {getFirestore, FieldValue} from 'firebase-admin/firestore';
import {getCourseProduct} from './products.js';

export async function ensurePortalUser({email, password, displayName}) {
  const auth = getAuth();
  const normalizedEmail = String(email).trim().toLowerCase();

  try {
    return await auth.getUserByEmail(normalizedEmail);
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error;
    }
  }

  return auth.createUser({
    email: normalizedEmail,
    password,
    displayName,
    emailVerified: false,
  });
}

export async function grantCourseAccess({
  uid,
  email,
  paymentId,
  orderId,
  productId,
  amountCents,
  customerName,
}) {
  const db = getFirestore();
  const product = getCourseProduct(productId);
  if (!product) {
    throw new Error(`Unknown product: ${productId}`);
  }

  const batch = db.batch();
  const purchaseRef = db.collection('purchases').doc(paymentId);
  batch.set(
    purchaseRef,
    {
      userId: uid,
      email,
      productId,
      productTitle: product.title,
      amountCents,
      currency: product.currency,
      squarePaymentId: paymentId,
      squareOrderId: orderId ?? null,
      customerName,
      status: 'completed',
      source: 'square',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    {merge: true},
  );

  const userRef = db.collection('users').doc(uid);
  batch.set(
    userRef,
    {
      email,
      displayName: customerName,
      updatedAt: FieldValue.serverTimestamp(),
    },
    {merge: true},
  );

  const libraryRef = userRef.collection('library').doc(productId);
  batch.set(
    libraryRef,
    {
      productId,
      productTitle: product.title,
      accessGranted: true,
      purchasedAt: FieldValue.serverTimestamp(),
      squarePaymentId: paymentId,
      portalUrl: product.portalUrl,
    },
    {merge: true},
  );

  await batch.commit();
  return product;
}
