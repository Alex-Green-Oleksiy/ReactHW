import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '@/shared/firebase/firebase'
import { db } from '@/shared/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
