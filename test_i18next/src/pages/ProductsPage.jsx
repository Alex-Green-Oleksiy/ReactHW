import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/firebase/firebase';
import { adminDeleteProduct } from '@/shared/firebase/functionsClient';
import { useAppState } from '@/app/providers/AppStateContext';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const { user, addToCart, toggleFavorite } = useAppState();
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = (i18n.language || 'en').startsWith('ua') ? 'ua' : 'en';

  useEffect(() => {
    const productsColRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsColRef, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (product) => {
    if (!user || user.role !== 'admin') return;
    const ok = confirm(t('products.confirmDelete', { name: product.title?.[lang] || product.id }));
    if (!ok) return;
    try {
      // Виклик бекенду: хмарна функція сама перевіряє права і видаляє документ та зображення
      await adminDeleteProduct({ id: product.id, imageUrl: product.imageUrl });
    } catch (e) {
      console.error('Delete product failed', e);
      alert('Не вдалося видалити товар');
    }
  };

  if (loading) {
    return <div>{t('products.loading')}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t('products.title')}</h1>
        {user?.role === 'admin' && (
          <Link to="/product-edit" className={styles.addButton}>
            {t('products.addNew')}
          </Link>
        )}
      </div>
      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className={styles.card}>
              {product.imageUrl && (
                <img
                  className={styles.cardImage}
                  src={product.imageUrl}
                  alt={product.title?.ua || product.title?.en || 'Product image'}
                />
              )}
              <h3 className={styles.title}>{product.title?.[lang] || product.title?.en || product.title?.ua || '—'}</h3>
              <p className={styles.desc}>{product.description?.[lang] || product.description?.en || product.description?.ua || ''}</p>
              <div className={styles.price}>${Number(product.price || 0).toFixed(2)}</div>
              <div className={styles.actions}>
                <button
                  className={`${styles.btn} ${styles.buyBtn}`}
                  onClick={() => addToCart({ id: product.id, title: product.title?.ua || product.title?.en, price: product.price })}
                  type="button"
                >
                  {t('products.buy')}
                </button>
                <button
                  className={`${styles.btn} ${styles.favBtn}`}
                  onClick={() => toggleFavorite({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl })}
                  type="button"
                  disabled={user?.role !== 'user'}
                  title={user?.role !== 'user' ? t('favorites.onlyForUser') : t('favorites.add')}
                >
                  {t('favorites.add')}
                </button>
              </div>
              {user?.role === 'admin' && (
                <>
                  <Link to={`/product-edit?id=${product.id}`} className={styles.editButton}>{t('products.edit')}</Link>
                  <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(product)}>
                    {t('common.remove')}
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>{t('products.empty')}</p>
        )}
      </div>
    </div>
  );
}
