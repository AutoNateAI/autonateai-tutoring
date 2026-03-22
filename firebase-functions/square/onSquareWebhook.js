import crypto from 'node:crypto';
import {onRequest} from 'firebase-functions/v2/https';
import {logger} from 'firebase-functions/v2';

function verifySignature({signature, body, url, signatureKey}) {
  if (!signature || !signatureKey) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', signatureKey);
  hmac.update(url + body);
  const digest = hmac.digest('base64');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export const onSquareWebhook = onRequest(
  {
    rawBody: true,
    cors: false,
    maxInstances: 10,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const signature = req.headers['x-square-hmacsha256-signature'];
    const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY ?? '';
    const publicUrl = process.env.SQUARE_WEBHOOK_PUBLIC_URL ?? '';

    if (!verifySignature({
      signature: String(signature ?? ''),
      body: req.rawBody.toString('utf8'),
      url: publicUrl,
      signatureKey,
    })) {
      logger.warn('Square webhook signature verification failed');
      res.status(400).json({error: 'Invalid signature'});
      return;
    }

    logger.info('Square webhook received', {
      eventType: req.body?.type ?? 'unknown',
    });

    res.status(200).json({received: true});
  },
);
