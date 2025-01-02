import '../assets/css/pages/basket.css'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router'
import useBasketSidebarData, { IBasketTotal } from '../hooks/useBasketSidebarData.ts'
import { useAppStore } from '../providers/AppProvider.tsx'
import useProductsById from '../hooks/useProductsById.ts'
import BasketEmpty from '../templates/basket/BasketEmpty.tsx'
import BasketList from '../templates/basket/BasketList.tsx'
import OrderTotalSidebar from '../templates/basket/OrderTotalSidebar.tsx'
import PageHeader from '../templates/PageHeader.tsx'
import { buildBasketTotal } from '../utils'

const BasketPage = () => {
  const { products, basket } = useAppStore()
  const [totals, setTotals] = useState<IBasketTotal[]>([])

  // ******************************* //

  const productsById = useProductsById(products)
  const { subtotal, total } = useBasketSidebarData(totals)

  useEffect(() => {
    setTotals(buildBasketTotal(basket, productsById))
  }, [productsById, basket])

  // ******************************* //

  return (
    <>
      <Helmet>
        <title>VegetableShop | Basket page</title>
      </Helmet>

      <PageHeader title="Basket">
        <span className="basket-qty">{basket.length > 0 && `${basket.length} items`}</span>
      </PageHeader>

      {basket.length === 0
        ? <BasketEmpty />
        : (
          <div className="basket-wrapper">
            <div className="basket-cards">
              <BasketList productsById={productsById} />
            </div>

            <OrderTotalSidebar subtotal={subtotal} total={total}>
              <NavLink
                to="/checkout"
                className="primary-green-btn basket-sidebar--link"
                children="Continue to payment"
              />
            </OrderTotalSidebar>
          </div>
        )
      }
    </>
  )
}

export default BasketPage