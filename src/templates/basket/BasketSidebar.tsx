import { FC } from 'react'
import { NavLink } from 'react-router'
import { useAppStore } from '../../providers/AppProvider.tsx'

interface BasketSidebarProps {
  subtotal: number,
  total: number
}

const BasketSidebar: FC<BasketSidebarProps> = ({ subtotal, total }) => {
  const { config } = useAppStore()

  return (
    <aside className="basket-sidebar">
      <div className="basket-sidebar--shell rounded-card">
        <span className="basket-sidebar--title">Order summary</span>

        <div className="basket-sidebar--details">
          <div className="basket-sidebar--details--row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="basket-sidebar--details--row">
            <span>Shipping</span>
            <span>${config.shipping.toFixed(2)}</span>
          </div>

          <div className="basket-sidebar--details--row">
            <span>Tax</span>
            <span>${config.tax.toFixed(2)}</span>
          </div>
          <div className="basket-sidebar--details--row">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        <NavLink
          to="/checkout"
          className="primary-green-btn basket-sidebar--link"
          children="Continue to payment"
        />
      </div>
    </aside>
  )
}

export default BasketSidebar