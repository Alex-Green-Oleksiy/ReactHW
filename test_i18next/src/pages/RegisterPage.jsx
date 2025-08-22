import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '@/shared/firebase/firebase'
import { db } from '@/shared/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import styles from '@/shared/ui/Form.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const userCredential = await signUp(email, password)
      const user = userCredential.user

      // Create user document in Firestore with default 'user' role
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
      })

      navigate('/')
    } catch (err) {
      setError('Failed to register. Please try again.')
      console.error(err)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className={styles.formButton}>Register</button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  )
}
