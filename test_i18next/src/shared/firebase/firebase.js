import { initializeApp } from 'firebase/app'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  getDocs,
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

export const db = initializeFirestore(app, {
  cache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  ignoreUndefinedProperties: true, // Ignore undefined properties to prevent errors
})
export const auth = getAuth(app)
export const storage = getStorage(app)

// Offline persistence enabled via initializeFirestore cache settings above

// Auth functions
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const signOut = () => firebaseSignOut(auth)

// Firestore functions
export const getProducts = async () => {
  const productsCol = collection(db, 'products')
  const productSnapshot = await getDocs(productsCol)
  const productList = productSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return productList
}

// Storage helpers
export const uploadProductImage = async (file, path) => {
  try {
    const fileRef = ref(storage, path)
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}

export const deleteProductImage = async (path) => {
  try {
    const fileRef = ref(storage, path)
    await deleteObject(fileRef)
  } catch (e) {
    // Ignore if file not found or deletion fails; log for debugging
    console.warn('deleteProductImage failed:', e?.code || e?.message || e)
  }
}

// Validate image file
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, or WebP images.')
  }
  
  if (file.size > maxSize) {
    throw new Error('File size too large. Please upload images smaller than 5MB.')
  }
  
  return true
}

// Generate unique file path
export const generateImagePath = (productId, fileName) => {
  const timestamp = Date.now()
  const extension = fileName.split('.').pop()
  return `products/${productId}/${timestamp}.${extension}`
}
