import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/shared/firebase/firebase';
import { useAppState } from '@/app/providers/AppStateContext';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const { user } = useAppState();
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
                <img src={product.imageUrl} alt={product.title?.en || product.title?.ua || 'Product image'} style={{ width: '100%', borderRadius: 6, marginBottom: 8 }} />
              )}
              <h3>{product.title?.en || product.title?.ua || 'No title'}</h3>
              <p>{product.description?.en || product.description?.ua || 'No description'}</p>
              <p className={styles.price}>${product.price}</p>
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
