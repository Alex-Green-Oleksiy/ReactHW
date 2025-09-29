import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signUp } from '@/shared/firebase/firebase'
import { db } from '@/shared/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import styles from '@/shared/ui/Form.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Валідація паролів
    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordMismatch'))
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t('auth.errors.passwordTooShort'))
      setLoading(false)
      return
    }

    try {
      const userCredential = await signUp(email, password)
      const user = userCredential.user

      // Create user document in Firestore with default 'user' role
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
        createdAt: new Date().toISOString(),
      })

      navigate('/')
    } catch (err) {
      let errorMessage = t('auth.errors.registerFailed')
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = t('auth.errors.emailInUse')
          break
        case 'auth/invalid-email':
          errorMessage = t('auth.errors.invalidEmail')
          break
        case 'auth/weak-password':
          errorMessage = t('auth.errors.weakPassword')
          break
      }
      
      setError(errorMessage)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>{t('auth.register.title')}</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('auth.email')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.emailPlaceholder')}
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">{t('auth.password')}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.passwordPlaceholder')}
            required
            disabled={loading}
            autoComplete="new-password"
            minLength={6}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('auth.confirmPasswordPlaceholder')}
            required
            disabled={loading}
            autoComplete="new-password"
            minLength={6}
          />
        </div>
        <button 
          type="submit" 
          className={styles.formButton}
          disabled={loading}
        >
          {loading ? t('auth.loading') : t('auth.register.button')}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
      <p className={styles.linkText}>
        {t('auth.register.haveAccount')}{' '}
        <Link to="/login" className={styles.link}>
          {t('auth.register.loginLink')}
        </Link>
      </p>
    </div>
  )
}
