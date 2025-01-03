import '../assets/css/pages/checkout.css'
import '../assets/css/pages/basket.css'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Navigate } from 'react-router'
import useBasketSidebarData from '../hooks/useBasketSidebarData.ts'
import useProductsById from '../hooks/useProductsById.ts'
import { useAppStore } from '../providers/AppProvider.tsx'
import OrderTotalSidebar from '../templates/basket/OrderTotalSidebar.tsx'
import PageHeader from '../templates/PageHeader.tsx'
import { buildBasketTotal } from '../utils'

const CheckoutPage = () => {
  const { products, basket } = useAppStore()
  const productsById = useProductsById(products)

  const totals = useMemo(() => {
    return buildBasketTotal(basket, productsById)
  }, [basket, productsById])

  const { subtotal, total } = useBasketSidebarData(totals)

  if (!subtotal) {
    return <Navigate to="/shop" />
  }

  return (
    <>
      <Helmet>
        <title>VegetableShop | Checkout page</title>
      </Helmet>

      <PageHeader title="Checkout">
        <p className="page-subtitle">Fill in all the details</p>
      </PageHeader>

      <div className="basket-wrapper">
        <div className="checkout-order rounded-card">
          <form id="placeAnOrderForm" action="">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input type="text" id="address" name="address" placeholder="Enter your address" required />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" placeholder="Enter your city" required />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>

              <select id="state" name="state" required>
                <option value="">Select your state</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="zip">Zip Code</label>
              <input type="text" id="zip" name="zip" placeholder="Enter your zip code" required />
            </div>

            <div className="form-group">
              <label htmlFor="payment">Payment Method</label>

              <select id="payment" name="payment" required>
                <option value="">Select payment method</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </form>
        </div>

        <OrderTotalSidebar subtotal={subtotal} total={total}>
          <input
            type="submit"
            value="Place an order"
            className="primary-green-btn basket-sidebar--link"
            form="placeAnOrderForm"
          />
        </OrderTotalSidebar>
      </div>
    </>
  )
}

export default CheckoutPage