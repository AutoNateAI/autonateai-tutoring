import {initializeApp} from 'firebase-admin/app';

initializeApp();

export {createSquareCoursePayment} from './square/createSquareCoursePayment.js';
export {onSquareWebhook} from './square/onSquareWebhook.js';
export {claimPortalAccessByEmail} from './square/claimPortalAccessByEmail.js';
export {completePortalPasswordSetup} from './square/completePortalPasswordSetup.js';
