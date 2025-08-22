import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

// Optional: offline persistence (best effort)
try {
  enableIndexedDbPersistence(db)
} catch {
  // ignore offline persistence errors (e.g., multiple tabs)
}

// Ensure we have an auth user (anonymous) for security rules
onAuthStateChanged(auth, (u) => {
  // TEMP: log current uid to verify auth works
  // Remove after verification
  // eslint-disable-next-line no-console
  console.log('[Auth] current user uid:', u?.uid)
  if (!u) {
    signInAnonymously(auth).catch((e) => {
      // eslint-disable-next-line no-console
      console.warn('[Auth] anonymous sign-in failed:', e?.message || e)
    })
  }
})
