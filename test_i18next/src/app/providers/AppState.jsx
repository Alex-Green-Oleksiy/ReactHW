import { useMemo, useState, useCallback, useEffect } from 'react'
import { db, auth } from '@/shared/firebase/firebase'
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { AppStateContext } from './AppStateContext'

export function AppStateProvider({ children }) {
  const [user, setUser] = useState({ id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'user' })
  const [cartItems, setCartItems] = useState([]) // [{id, title, price, qty}]
  const [favoriteItems, setFavoriteItems] = useState([]) // [{id, title, price}]
  const [firebaseUid, setFirebaseUid] = useState(null)

  // Hydrate favorites from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('favoriteItems')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setFavoriteItems(parsed)
      }
    } catch {
      // ignore JSON/localStorage read errors
    }
  }, [])

  // Persist favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    } catch {
      // ignore localStorage write errors
    }
  }, [favoriteItems])

  // Listen for Firebase Auth user (anonymous ensured in firebase.js)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setFirebaseUid(u?.uid || null)
      // TEMP: log uid changes for verification
      // Remove after verification
      console.log('[Auth] firebaseUid set to:', u?.uid || null)
    })
    return () => unsub()
  }, [])

  // Subscribe to Firestore favorites for this user
  useEffect(() => {
    if (!firebaseUid) return
    const colRef = collection(db, 'users', firebaseUid, 'favorites')
    const unsub = onSnapshot(colRef, (snap) => {
      const items = snap.docs.map((d) => d.data())
      // TEMP: log favorites snapshot for verification
      // Remove after verification
      console.log('[Firestore] favorites snapshot items:', items)
      setFavoriteItems(items)
    })
    return () => unsub()
  }, [firebaseUid])

  // Cart actions
  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i))
      }
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }, [])

  const updateCartQty = useCallback((id, qty) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  // Favorites actions (only role 'user' can add)
  const toggleFavorite = useCallback(
    (item) => {
      // Only allow users with role 'user' to add/toggle favorites
      if (user?.role !== 'user') return

      // If Firebase UID exists, write to Firestore (real-time sync will update state)
      if (firebaseUid) {
        const docRef = doc(db, 'users', firebaseUid, 'favorites', String(item.id))
        const exists = favoriteItems.some((i) => i.id === item.id)
        if (exists) {
          deleteDoc(docRef).catch(() => {})
        } else {
          setDoc(docRef, item).catch(() => {})
        }
        return
      }

      // Fallback: local state toggle when no Firebase user yet
      setFavoriteItems((prev) => {
        const exists = prev.some((i) => i.id === item.id)
        if (exists) return prev.filter((i) => i.id !== item.id)
        return [...prev, item]
      })
    },
    [user?.role, firebaseUid, favoriteItems]
  )

  const value = useMemo(
    () => ({
      user,
      setUser,
      cartItems,
      addToCart,
      updateCartQty,
      removeFromCart,
      favoriteItems,
      toggleFavorite,
    }),
    [user, cartItems, favoriteItems, addToCart, updateCartQty, removeFromCart, toggleFavorite]
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
