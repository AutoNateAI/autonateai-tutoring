import {onRequest} from 'firebase-functions/v2/https';
import {getAuth} from 'firebase-admin/auth';
import {logger} from 'firebase-functions/v2';
import {claimEmailAccessForUser} from './firebaseAccess.js';

function cors(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

export const claimPortalAccessByEmail = onRequest(
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
      const authHeader = req.headers.authorization || '';
      const match = authHeader.match(/^Bearer (.+)$/);
      if (!match) {
        res.status(401).json({error: 'Missing authorization token.'});
        return;
      }

      const decodedToken = await getAuth().verifyIdToken(match[1]);
      const email = decodedToken.email;
      if (!email) {
        res.status(400).json({error: 'Authenticated user does not have an email address.'});
        return;
      }

      const result = await claimEmailAccessForUser({
        uid: decodedToken.uid,
        email,
        displayName: decodedToken.name ?? decodedToken.email?.split('@')[0] ?? null,
      });

      if (!result.claimed) {
        res.status(403).json({error: 'No paid portal access found for this email.'});
        return;
      }

      res.status(200).json({
        ok: true,
        productIds: result.productIds,
      });
    } catch (error) {
      logger.error('claimPortalAccessByEmail failed', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to claim portal access.',
      });
    }
  },
);
