import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProductForm.module.css'

export default function ProductForm({ initialValue, onSubmit }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('en')
  const [form, setForm] = useState(
    initialValue || {
      title: { en: '', ua: '' },
      description: { en: '', ua: '' },
      price: ''
    }
  )

  const handleChangeText = (field, lang) => (e) => {
    const value = e.target.value
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] || {}),
        [lang]: value,
      },
    }))
  }

  const handleChangePrice = (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, price: value }))
  }

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price) || 0,
    }
    onSubmit?.(payload)
  }

  return (
    <form onSubmit={submit}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={[styles.tabBtn, activeTab === 'en' ? styles.tabBtnActive : null].filter(Boolean).join(' ')}
          onClick={() => setActiveTab('en')}
        >
          {t('product.tabs.en')}
        </button>
        <button
          type="button"
          className={[styles.tabBtn, activeTab === 'ua' ? styles.tabBtnActive : null].filter(Boolean).join(' ')}
          onClick={() => setActiveTab('ua')}
        >
          {t('product.tabs.ua')}
        </button>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.row}>
          <label>{t('product.fields.title')} ({activeTab.toUpperCase()})</label>
          <input
            className={styles.input}
            value={form.title?.[activeTab] || ''}
            onChange={handleChangeText('title', activeTab)}
          />
        </div>
        <div className={styles.row}>
          <label>{t('product.fields.description')} ({activeTab.toUpperCase()})</label>
          <textarea
            className={styles.textarea}
            value={form.description?.[activeTab] || ''}
            onChange={handleChangeText('description', activeTab)}
          />
        </div>
        <div className={styles.row}>
          <label>{t('product.fields.price')}</label>
          <input
            className={styles.input}
            type="number"
            min={0}
            step="0.01"
            value={form.price}
            onChange={handleChangePrice}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit">{t('common.save')}</button>
      </div>
    </form>
  )
}
