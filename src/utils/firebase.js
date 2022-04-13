// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

//import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
const firebaseConfig = {
  apiKey: 'AIzaSyDZc9DnkBNYjPPQyPEBClydrBUWX93IEow',
  authDomain: 'spacegym-dev.firebaseapp.com',
  projectId: 'spacegym-dev',
  storageBucket: 'spacegym-dev.appspot.com',
  messagingSenderId: '982265861409',
  appId: '1:982265861409:web:faa2e19253e51c71b09a60',
  measurementId: 'G-636KLWW2DE'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('6LchXkQfAAAAAG6B-CYepwcf_GoD3c3F8GjPcYBs'),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true
// });

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
