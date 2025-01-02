import { NavLink } from 'react-router'

const BasketEmpty = () => {
  return (
    <p>
      There are no items in the cart yet, go to{' '}
      <NavLink to="/shop" className="page-link">the store</NavLink>
    </p>
  )
}

export default BasketEmpty