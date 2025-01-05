import { FC, PropsWithChildren } from 'react'
import { useAppStore } from '../providers/AppProvider.tsx'

interface OrderTotalSidebarProps {
  subtotal: number,
  total: number
}

const TotalSidebar: FC<PropsWithChildren<OrderTotalSidebarProps>> = ({ subtotal, total, children }) => {
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

        {children}
      </div>
    </aside>
  )
}

export default TotalSidebar