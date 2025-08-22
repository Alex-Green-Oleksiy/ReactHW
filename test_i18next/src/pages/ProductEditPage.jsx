import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import ProductForm from '@/entities/product/ProductForm'
import { db, uploadProductImage } from '@/shared/firebase/firebase'
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
    const { imageFile, ...base } = data
    try {
      if (isEdit) {
        const docRef = doc(db, 'products', productId)
        let updatePayload = { ...base }
        if (imageFile) {
          const url = await uploadProductImage(imageFile, `products/${productId}.jpg`)
          updatePayload.imageUrl = url
        }
        await updateDoc(docRef, updatePayload)
      } else {
        // Create new product first
        const colRef = collection(db, 'products')
        const created = await addDoc(colRef, base)
        if (imageFile) {
          const url = await uploadProductImage(imageFile, `products/${created.id}.jpg`)
          await updateDoc(doc(db, 'products', created.id), { imageUrl: url })
        }
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
