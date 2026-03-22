import {onRequest} from 'firebase-functions/v2/https';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore, FieldValue} from 'firebase-admin/firestore';
import {logger} from 'firebase-functions/v2';

function cors(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

export const completePortalPasswordSetup = onRequest(
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
      await getFirestore().collection('users').doc(decodedToken.uid).set(
        {
          mustChangePassword: false,
          updatedAt: FieldValue.serverTimestamp(),
        },
        {merge: true},
      );

      res.status(200).json({ok: true});
    } catch (error) {
      logger.error('completePortalPasswordSetup failed', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to complete password setup.',
      });
    }
  },
);
