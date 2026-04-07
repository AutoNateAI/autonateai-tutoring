import crypto from 'node:crypto';
import {onRequest} from 'firebase-functions/v2/https';
import {logger} from 'firebase-functions/v2';
import {
  ensurePortalUser,
  generateTemporaryPassword,
  grantCourseAccess,
  markPasswordSetupRequired,
  normalizeEmail,
  upsertEmailAccess,
} from './firebaseAccess.js';
import {sendPortalPurchaseEmail} from './email.js';
import {getCourseProduct} from './products.js';

function cors(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

async function squareRequest(path, body) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Missing SQUARE_ACCESS_TOKEN');
  }

  const environment = process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
  const origin =
    environment === 'production'
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com';

  const response = await fetch(`${origin}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Square-Version': process.env.SQUARE_VERSION ?? '2026-03-18',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.errors?.[0]?.detail ?? 'Square API request failed.');
  }

  return payload;
}

export const createSquareCoursePayment = onRequest(
  {
    cors: false,
    maxInstances: 10,
    secrets: [],
  },
  async (req, res) => {
    cors(res);
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({error: 'Method Not Allowed'});
      return;
    }

    try {
      const {sourceId, productId, customerName, email, organizationName} = req.body ?? {};

      if (!sourceId || !productId || !customerName || !email) {
        res.status(400).json({error: 'sourceId, productId, customerName, and email are required.'});
        return;
      }

      const product = getCourseProduct(productId);
      if (!product) {
        res.status(400).json({error: 'Unknown product.'});
        return;
      }

      const normalizedEmail = normalizeEmail(email);

      const paymentPayload = {
        idempotency_key: crypto.randomUUID(),
        source_id: sourceId,
        location_id: process.env.SQUARE_LOCATION_ID,
        amount_money: {
          amount: product.amountCents,
          currency: product.currency,
        },
        autocomplete: true,
        note:
          product.fulfillmentType === 'organization-program'
            ? `${product.title} for ${organizationName || customerName} (${normalizedEmail})`
            : `${product.title} purchase for ${normalizedEmail}`,
        buyer_email_address: normalizedEmail,
        reference_id: `${product.id}:${normalizedEmail}`,
      };

      const squareResponse = await squareRequest('/v2/payments', paymentPayload);
      const payment = squareResponse.payment;
      let temporaryPassword = '';

      if (product.grantsPortalAccess) {
        temporaryPassword = generateTemporaryPassword();
        const {user} = await ensurePortalUser({
          email: normalizedEmail,
          password: temporaryPassword,
          displayName: customerName,
        });

        await upsertEmailAccess({
          email: normalizedEmail,
          productId: product.id,
          customerName,
          paymentId: payment.id,
          orderId: payment.order_id,
          amountCents: product.amountCents,
        });
        await grantCourseAccess({
          uid: user.uid,
          email: normalizedEmail,
          paymentId: payment.id,
          orderId: payment.order_id,
          productId: product.id,
          amountCents: product.amountCents,
          customerName,
        });
        await markPasswordSetupRequired({
          uid: user.uid,
          email: normalizedEmail,
          displayName: customerName,
        });
      }

      let emailSent = false;
      try {
        const emailResult = await sendPortalPurchaseEmail({
          email: normalizedEmail,
          customerName,
          product,
          temporaryPassword: temporaryPassword || undefined,
          organizationName,
        });
        emailSent = Boolean(emailResult?.sent);
      } catch (emailError) {
        logger.error('Portal purchase email failed', emailError);
      }

      const successMessage =
        product.fulfillmentType === 'organization-program'
          ? `Payment complete. ${organizationName || customerName} is confirmed for the workshop program. Nate will follow up by email with scheduling options and next installation steps.${emailSent ? ' A confirmation email was also sent.' : ''}`
          : temporaryPassword
            ? `Payment complete. Your portal account is ready. Use ${normalizedEmail} and the temporary password below, then update it when you first sign in. Nate will also follow up by email with his calendar availability for your live 2-hour coaching session.${emailSent ? ' A copy was also emailed to you.' : ''}`
            : `Payment complete. Your paid access is ready for ${normalizedEmail}.${emailSent ? ' A receipt email was also sent.' : ''}`;

      res.status(200).json({
        ok: true,
        paymentId: payment.id,
        productId: product.id,
        portalUrl: product.portalUrl ?? '',
        portalEmail: normalizedEmail,
        temporaryPassword,
        mustChangePassword: Boolean(temporaryPassword),
        emailSent,
        successMessage,
      });
    } catch (error) {
      logger.error('createSquareCoursePayment failed', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Payment failed.',
      });
    }
  },
);
