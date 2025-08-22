import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/shared/firebase/firebase';
import styles from '@/shared/ui/Form.module.css';

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError('Failed to log in. Please check your credentials.')
      console.error(err)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className={styles.formButton}>Log In</button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}
