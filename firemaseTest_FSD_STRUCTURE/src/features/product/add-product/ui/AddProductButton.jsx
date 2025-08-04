import React from 'react'
import { Link } from 'react-router'
import styles from './AddProductButton.module.css'

export const AddProductButton = ({ className }) => {
  return (
    <Link
      to="/products/add"
      className={`${styles.addButton} ${className || ''}`}
    >
      + Додати товар
    </Link>
  )
}
