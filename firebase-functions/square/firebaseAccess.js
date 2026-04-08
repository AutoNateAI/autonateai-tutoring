import {getAuth} from 'firebase-admin/auth';
import {getFirestore, FieldValue} from 'firebase-admin/firestore';
import {getCourseProduct} from './products.js';

export function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export function generateTemporaryPassword(length = 16) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  let password = '';
  for (let index = 0; index < length; index += 1) {
    password += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return password;
}

export async function ensurePortalUser({email, password, displayName}) {
  const auth = getAuth();
  const normalizedEmail = normalizeEmail(email);

  try {
    const existingUser = await auth.getUserByEmail(normalizedEmail);
    await auth.updateUser(existingUser.uid, {
      password,
      displayName: displayName || existingUser.displayName || undefined,
    });
    return {user: existingUser, created: false};
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error;
    }
  }

  const createdUser = await auth.createUser({
    email: normalizedEmail,
    password,
    displayName,
    emailVerified: false,
  });
  return {user: createdUser, created: true};
}

export async function upsertEmailAccess({
  email,
  productId,
  customerName,
  paymentId,
  orderId,
  amountCents,
}) {
  const db = getFirestore();
  const product = getCourseProduct(productId);
  if (!product) {
    throw new Error(`Unknown product: ${productId}`);
  }

  const normalizedEmail = normalizeEmail(email);
  const accessRef = db.collection('emailAccess').doc(normalizedEmail);

  await accessRef.set(
    {
      email: normalizedEmail,
      displayName: customerName,
      updatedAt: FieldValue.serverTimestamp(),
      products: {
        [productId]: {
          productId,
          productTitle: product.title,
          accessGranted: true,
          portalUrl: product.portalUrl,
          amountCents,
          currency: product.currency,
          latestSquarePaymentId: paymentId,
          latestSquareOrderId: orderId ?? null,
          updatedAt: FieldValue.serverTimestamp(),
        },
      },
    },
    {merge: true},
  );

  return product;
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
      mustChangePassword: false,
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

export async function markPasswordSetupRequired({uid, email, displayName}) {
  const db = getFirestore();
  await db.collection('users').doc(uid).set(
    {
      email: normalizeEmail(email),
      displayName,
      mustChangePassword: true,
      updatedAt: FieldValue.serverTimestamp(),
    },
    {merge: true},
  );
}

export async function countCompletedPurchasesForProduct(productId) {
  const db = getFirestore();
  const snapshot = await db
    .collection('purchases')
    .where('productId', '==', productId)
    .where('status', '==', 'completed')
    .count()
    .get();

  return snapshot.data().count ?? 0;
}

export async function claimEmailAccessForUser({uid, email, displayName}) {
  const db = getFirestore();
  const normalizedEmail = normalizeEmail(email);
  const accessSnap = await db.collection('emailAccess').doc(normalizedEmail).get();

  if (!accessSnap.exists) {
    return {claimed: false, productIds: []};
  }

  const accessData = accessSnap.data() ?? {};
  const products = accessData.products ?? {};
  const productIds = Object.keys(products).filter((productId) => getCourseProduct(productId));

  if (productIds.length === 0) {
    return {claimed: false, productIds: []};
  }

  const batch = db.batch();
  const userRef = db.collection('users').doc(uid);
  batch.set(
    userRef,
    {
      email: normalizedEmail,
      displayName: displayName || accessData.displayName || null,
      updatedAt: FieldValue.serverTimestamp(),
    },
    {merge: true},
  );

  for (const productId of productIds) {
    const product = getCourseProduct(productId);
    const libraryRef = userRef.collection('library').doc(productId);
    batch.set(
      libraryRef,
      {
        productId,
        productTitle: product.title,
        accessGranted: true,
        purchasedAt: products[productId]?.updatedAt ?? FieldValue.serverTimestamp(),
        portalUrl: product.portalUrl,
        source: 'square-email-claim',
        latestSquarePaymentId: products[productId]?.latestSquarePaymentId ?? null,
      },
      {merge: true},
    );
  }

  await batch.commit();
  return {claimed: true, productIds};
}
