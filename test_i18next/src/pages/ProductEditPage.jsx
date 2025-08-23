import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import ProductForm from '@/entities/product/ProductForm'
import { db } from '@/shared/firebase/firebase'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

export default function ProductEditPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('id') || null
  const [product, setProduct] = useState({
    title: { en: 'Demo product', ua: 'Демо товар' },
    description: { en: 'Demo description', ua: 'Демо опис' },
    price: 10,
    imageUrl: '',
  })

  const isEdit = useMemo(() => Boolean(productId), [productId])

  const handleSubmit = async (data) => {
    const base = data
    try {
      if (isEdit) {
        const docRef = doc(db, 'products', productId)
        await updateDoc(docRef, base)
      } else {
        // Create new product first
        const colRef = collection(db, 'products')
        await addDoc(colRef, base)
      }
      setProduct(data)
      alert(t('product.saved'))
    } catch (e) {
      console.error('Failed to save product', e)
      alert('Failed to save product')
    }
  }

  return (
    <div>
      <h2>{t('product.editTitle')}</h2>
      <ProductForm initialValue={product} onSubmit={handleSubmit} />
    </div>
  )
}
