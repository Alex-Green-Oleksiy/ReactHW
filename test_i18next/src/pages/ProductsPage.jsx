import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/shared/firebase/firebase';
import { useAppState } from '@/app/providers/AppStateContext';
import ImageWithFallback from '@/shared/ui/ImageWithFallback';
import SearchAndFilter from '@/shared/ui/SearchAndFilter';
import Pagination from '@/shared/ui/Pagination';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const { user, addToCart, toggleFavorite } = useAppState();
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
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
    
    // Optimistic update - remove from UI immediately
    const originalProducts = [...products];
    setProducts(prev => prev.filter(p => p.id !== product.id));
    
    try {
      await deleteDoc(doc(db, 'products', product.id));
      // Success - the optimistic update was correct
    } catch (e) {
      console.error('Delete product failed', e);
      // Rollback optimistic update
      setProducts(originalProducts);
      alert(t('products.deleteError') || 'Не вдалося видалити товар');
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const title = product.title?.[lang] || product.title?.en || product.title?.ua || '';
        const description = product.description?.[lang] || product.description?.en || product.description?.ua || '';
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               description.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Sort products
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return (a.price || 0) - (b.price || 0);
          case 'price-desc':
            return (b.price || 0) - (a.price || 0);
          case 'title-asc':
            const titleA = a.title?.[lang] || a.title?.en || a.title?.ua || '';
            const titleB = b.title?.[lang] || b.title?.en || b.title?.ua || '';
            return titleA.localeCompare(titleB);
          case 'title-desc':
            const titleA2 = a.title?.[lang] || a.title?.en || a.title?.ua || '';
            const titleB2 = b.title?.[lang] || b.title?.en || b.title?.ua || '';
            return titleB2.localeCompare(titleA2);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, sortBy, lang]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  if (loading) {
    return <div>{t('products.loading')}</div>;
  }

  const sortOptions = [
    { value: 'price-asc', label: t('products.sort.priceAsc') },
    { value: 'price-desc', label: t('products.sort.priceDesc') },
    { value: 'title-asc', label: t('products.sort.titleAsc') },
    { value: 'title-desc', label: t('products.sort.titleDesc') }
  ];

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
      
      <SearchAndFilter
        onSearch={setSearchTerm}
        onSort={setSortBy}
        searchPlaceholder={t('products.searchPlaceholder')}
        sortOptions={sortOptions}
      />
      
      <div className={styles.grid}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <div key={product.id} className={styles.card}>
              <ImageWithFallback
                src={product.imageUrl}
                alt={product.title?.ua || product.title?.en || 'Product image'}
                className={styles.cardImage}
                fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
              />
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
                  disabled={!user}
                  title={!user ? t('auth.loginRequired') : t('favorites.add')}
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
          <p>{searchTerm ? t('products.noResults') : t('products.empty')}</p>
        )}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAndSortedProducts.length}
      />
    </div>
  );
}
