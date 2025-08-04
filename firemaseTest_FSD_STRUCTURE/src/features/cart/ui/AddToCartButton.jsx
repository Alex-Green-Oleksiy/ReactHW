import { useDispatch } from 'react-redux'
import { addToCart } from '../model/cartSlice'
import styles from './AddToCartButton.module.css'

export const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addToCart(product))
  }

  return (
    <button
      onClick={handleClick}
      className={styles.addToCartButton}
    >
      Add to Cart
    </button>
  )
}
