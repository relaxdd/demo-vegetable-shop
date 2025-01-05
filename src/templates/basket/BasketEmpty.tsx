import { Link } from 'react-router'

const BasketEmpty = () => {
  return (
    <p>
      There are no items in the cart yet, go to{' '}
      <Link to="/shop" className="page-link">the store</Link>
    </p>
  )
}

export default BasketEmpty