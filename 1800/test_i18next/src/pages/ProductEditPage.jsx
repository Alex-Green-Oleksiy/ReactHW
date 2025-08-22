import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductForm from '@/entities/product/ProductForm'

export default function ProductEditPage() {
  const { t } = useTranslation()
  const [product, setProduct] = useState({
    title: { en: 'Demo product', ua: 'Демо товар' },
    description: { en: 'Demo description', ua: 'Демо опис' },
    price: 10,
  })

  const handleSubmit = (data) => {
    setProduct(data)
    alert(t('product.saved'))
  }

  return (
    <div>
      <h2>{t('product.editTitle')}</h2>
      <ProductForm initialValue={product} onSubmit={handleSubmit} />
    </div>
  )
}
