import crypto from 'node:crypto';
import {onRequest} from 'firebase-functions/v2/https';
import {logger} from 'firebase-functions/v2';
import {ensurePortalUser, grantCourseAccess} from './firebaseAccess.js';
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
      const {sourceId, productId, customerName, email, password} = req.body ?? {};

      if (!sourceId || !productId || !customerName || !email || !password) {
        res.status(400).json({error: 'sourceId, productId, customerName, email, and password are required.'});
        return;
      }

      const product = getCourseProduct(productId);
      if (!product) {
        res.status(400).json({error: 'Unknown product.'});
        return;
      }

      const user = await ensurePortalUser({
        email,
        password,
        displayName: customerName,
      });

      const paymentPayload = {
        idempotency_key: crypto.randomUUID(),
        source_id: sourceId,
        location_id: process.env.SQUARE_LOCATION_ID,
        amount_money: {
          amount: product.amountCents,
          currency: product.currency,
        },
        autocomplete: true,
        note: `${product.title} purchase for ${String(email).trim().toLowerCase()}`,
        buyer_email_address: String(email).trim().toLowerCase(),
        reference_id: `${product.id}:${user.uid}`,
      };

      const squareResponse = await squareRequest('/v2/payments', paymentPayload);
      const payment = squareResponse.payment;

      await grantCourseAccess({
        uid: user.uid,
        email: String(email).trim().toLowerCase(),
        paymentId: payment.id,
        orderId: payment.order_id,
        productId: product.id,
        amountCents: product.amountCents,
        customerName,
      });

      res.status(200).json({
        ok: true,
        paymentId: payment.id,
        productId: product.id,
        portalUrl: product.portalUrl,
      });
    } catch (error) {
      logger.error('createSquareCoursePayment failed', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Payment failed.',
      });
    }
  },
);
