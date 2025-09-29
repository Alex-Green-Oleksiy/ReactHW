import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { db, auth } from '@/shared/firebase/firebase'
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { AppStateContext } from './AppStateContext'

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(null) // null for guest, user object for logged in
  const [loading, setLoading] = useState(true) // Loading state for auth
  const [cartItems, setCartItems] = useState([]) // [{id, title, price, qty, imageUrl}]
  const [cartLoading, setCartLoading] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState([]) // [{id, title, price}]
  const userDocUnsubRef = useRef(null)

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

  // Listen for Firebase Auth state changes and manage user doc subscription
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (authUser) => {
      // Clean previous user doc listener if exists
      if (userDocUnsubRef.current) {
        try {
          userDocUnsubRef.current()
        } catch (e) {
          console.warn('Unsubscribe user doc failed', e)
        }
        userDocUnsubRef.current = null
      }

      if (authUser) {
        const userDocRef = doc(db, 'users', authUser.uid)
        userDocUnsubRef.current = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser({ id: authUser.uid, ...docSnap.data() })
          } else {
            setUser({ id: authUser.uid, email: authUser.email, role: 'user' })
          }
          setLoading(false)
        }, (error) => {
          console.error('Error fetching user document:', error)
          setUser({ id: authUser.uid, email: authUser.email, role: 'user' })
          setLoading(false)
        })
      } else {
        // User is signed out
        setUser(null)
        setFavoriteItems([])
        setLoading(false)
      }
    })

    return () => {
      if (userDocUnsubRef.current) {
        try {
          userDocUnsubRef.current()
        } catch (e) {
          console.warn('Unsubscribe user doc failed (cleanup)', e)
        }
      }
      unsubAuth()
    }
  }, [])

  // Subscribe to Firestore favorites for this user
  useEffect(() => {
    if (!user?.id) return
    const colRef = collection(db, 'users', user.id, 'favorites')
    const unsub = onSnapshot(colRef, (snap) => {
      const items = snap.docs.map((d) => d.data())
      setFavoriteItems(items)
    }, (error) => {
      console.error('Error fetching favorites:', error)
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
    
    // Show success notification (you could integrate a toast library here)
    console.log(`Added ${item.title || item.id} to cart`)
  }, [])

  const updateCartQty = useCallback((id, qty) => {
    if (qty <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
    console.log(`Removed item ${id} from cart`)
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    console.log('Cart cleared')
  }, [])

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0)
  }, [cartItems])

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0)
  }, [cartItems])

  // Favorites actions (any logged in user can add)
  const toggleFavorite = useCallback(
    (item) => {
      // Only allow logged in users to add/toggle favorites
      if (!user) return

      // If a user is logged in, write to Firestore with optimistic update
      if (user?.id) {
        const docRef = doc(db, 'users', user.id, 'favorites', String(item.id))
        const exists = favoriteItems.some((i) => i.id === item.id)
        
        // Optimistic update
        if (exists) {
          setFavoriteItems(prev => prev.filter(i => i.id !== item.id))
          deleteDoc(docRef).catch((error) => {
            console.error('Failed to remove favorite:', error)
            // Rollback optimistic update
            setFavoriteItems(prev => [...prev, item])
          })
        } else {
          setFavoriteItems(prev => [...prev, item])
          setDoc(docRef, item).catch((error) => {
            console.error('Failed to add favorite:', error)
            // Rollback optimistic update
            setFavoriteItems(prev => prev.filter(i => i.id !== item.id))
          })
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
      cartLoading,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      favoriteItems,
      toggleFavorite,
    }),
    [user, cartItems, cartLoading, favoriteItems, addToCart, updateCartQty, removeFromCart, clearCart, getCartTotal, getCartItemsCount, toggleFavorite]
  )

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '1rem', color: '#666' }}>Loading app...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
