import { useMemo, useState, useCallback, useEffect } from 'react'
import { db, auth } from '@/shared/firebase/firebase'
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { AppStateContext } from './AppStateContext'

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(null) // null for guest, user object for logged in
  const [loading, setLoading] = useState(true) // Loading state for auth
  const [cartItems, setCartItems] = useState([]) // [{id, title, price, qty}]
  const [favoriteItems, setFavoriteItems] = useState([]) // [{id, title, price}]

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

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in, fetch their data from Firestore
        const userDocRef = doc(db, 'users', authUser.uid)
        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser({ id: authUser.uid, ...docSnap.data() })
          } else {
            setUser({ id: authUser.uid, email: authUser.email, role: 'user' })
          }
          setLoading(false)
        })
        // Set up a cleanup function for the user document listener
        return unsubDoc
      } else {
        // User is signed out
        setUser(null)
        setFavoriteItems([]) // Clear favorites on logout
        setLoading(false)
      }
    })
    return () => unsub()
  }, [])

  // Subscribe to Firestore favorites for this user
  useEffect(() => {
    if (!user?.id) return
    const colRef = collection(db, 'users', user.id, 'favorites')
    const unsub = onSnapshot(colRef, (snap) => {
      const items = snap.docs.map((d) => d.data())
      setFavoriteItems(items)
    })
    return () => unsub()
  }, [user?.id])

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

      // If a user is logged in, write to Firestore (real-time sync will update state)
      if (user?.id) {
        const docRef = doc(db, 'users', user.id, 'favorites', String(item.id))
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
    [user, favoriteItems]
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

  if (loading) {
    return <div>Loading app...</div> // Or a proper spinner component
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
