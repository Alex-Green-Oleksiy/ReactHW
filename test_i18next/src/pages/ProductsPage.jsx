import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/firebase/firebase';
import { useAppState } from '@/app/providers/AppStateContext';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const { user, addToCart, toggleFavorite } = useAppState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products</h1>
        {user?.role === 'admin' && (
          <Link to="/product-edit" className={styles.addButton}>
            Add New Product
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
              <h3 className={styles.title}>{product.title?.ua || product.title?.en || 'Без назви'}</h3>
              <p className={styles.desc}>{product.description?.ua || product.description?.en || 'Без опису'}</p>
              <div className={styles.price}>${Number(product.price || 0).toFixed(2)}</div>
              <div className={styles.actions}>
                <button
                  className={`${styles.btn} ${styles.buyBtn}`}
                  onClick={() => addToCart({ id: product.id, title: product.title?.ua || product.title?.en, price: product.price })}
                  type="button"
                >
                  Купити
                </button>
                <button
                  className={`${styles.btn} ${styles.favBtn}`}
                  onClick={() => toggleFavorite({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl })}
                  type="button"
                  disabled={user?.role !== 'user'}
                  title={user?.role !== 'user' ? 'Доступно лише для ролі Користувач' : 'Додати в обрані'}
                >
                  В обране
                </button>
              </div>
              {user?.role === 'admin' && (
                <Link to={`/product-edit?id=${product.id}`} className={styles.editButton}>Edit</Link>
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
