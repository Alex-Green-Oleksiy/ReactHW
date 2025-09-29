import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signIn } from '@/shared/firebase/firebase';
import { sanitizeInput, isValidEmail, apiRateLimiter } from '@/shared/utils/security';
import { announceToScreenReader, generateId } from '@/shared/utils/accessibility';
import styles from '@/shared/ui/Form.module.css';

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Generate unique IDs for accessibility
  const emailId = generateId('login-email')
  const passwordId = generateId('login-password')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    // Rate limiting check
    if (!apiRateLimiter.isAllowed('login')) {
      const errorMessage = t('auth.errors.tooManyRequests')
      setError(errorMessage)
      announceToScreenReader(errorMessage, 'assertive')
      return
    }
    
    // Input validation
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedPassword = sanitizeInput(password)
    
    if (!isValidEmail(sanitizedEmail)) {
      const errorMessage = t('auth.errors.invalidEmail')
      setError(errorMessage)
      announceToScreenReader(errorMessage, 'assertive')
      return
    }
    
    setLoading(true)
    
    try {
      await signIn(sanitizedEmail, sanitizedPassword)
      announceToScreenReader(t('auth.loginSuccess'), 'polite')
      navigate('/')
    } catch (err) {
      let errorMessage = t('auth.errors.generic')
      
      // Більш детальні повідомлення про помилки
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = t('auth.errors.userNotFound')
          break
        case 'auth/wrong-password':
          errorMessage = t('auth.errors.wrongPassword')
          break
        case 'auth/invalid-email':
          errorMessage = t('auth.errors.invalidEmail')
          break
        case 'auth/too-many-requests':
          errorMessage = t('auth.errors.tooManyRequests')
          break
        default:
          errorMessage = t('auth.errors.generic')
      }
      
      setError(errorMessage)
      announceToScreenReader(errorMessage, 'assertive')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>{t('auth.login.title')}</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor={emailId}>{t('auth.email')}</label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.emailPlaceholder')}
            required
            disabled={loading}
            autoComplete="email"
            aria-describedby={error ? `${emailId}-error` : undefined}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={passwordId}>{t('auth.password')}</label>
          <input
            id={passwordId}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.passwordPlaceholder')}
            required
            disabled={loading}
            autoComplete="current-password"
            aria-describedby={error ? `${passwordId}-error` : undefined}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>
        <button 
          type="submit" 
          className={styles.formButton}
          disabled={loading}
        >
          {loading ? t('auth.loading') : t('auth.login.button')}
        </button>
        {error && (
          <div 
            id={`${emailId}-error`}
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </form>
      <p className={styles.linkText}>
        {t('auth.login.noAccount')}{' '}
        <Link to="/register" className={styles.link}>
          {t('auth.login.registerLink')}
        </Link>
      </p>
    </div>
  );
}
