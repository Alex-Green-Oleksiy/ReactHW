import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SearchAndFilter.module.css'

export default function SearchAndFilter({ 
  onSearch, 
  onFilter, 
  onSort,
  searchPlaceholder = 'Search...',
  filterOptions = [],
  sortOptions = []
}) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')
  const [selectedSort, setSelectedSort] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch?.(value)
  }

  const handleFilter = (value) => {
    setSelectedFilter(value)
    onFilter?.(value)
  }

  const handleSort = (value) => {
    setSelectedSort(value)
    onSort?.(value)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedFilter('')
    setSelectedSort('')
    onSearch?.('')
    onFilter?.('')
    onSort?.('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.filters}>
        {filterOptions.length > 0 && (
          <select
            value={selectedFilter}
            onChange={(e) => handleFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">{t('filters.all')}</option>
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        
        {sortOptions.length > 0 && (
          <select
            value={selectedSort}
            onChange={(e) => handleSort(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="">{t('filters.sortBy')}</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        
        <button 
          onClick={clearFilters}
          className={styles.clearButton}
        >
          {t('filters.clear')}
        </button>
      </div>
    </div>
  )
}
