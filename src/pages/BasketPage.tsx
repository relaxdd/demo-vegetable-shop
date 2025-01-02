import '../assets/css/pages/basket.css'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { ICartItem, IProduct } from '../@types'
import useBasketSidebarData, { IBasketTotal } from '../hooks/useBasketSidebarData.ts'
import { useAppStore } from '../providers/AppProvider.tsx'
import useProductsById from '../hooks/useProductsById.ts'
import BasketEmpty from '../templates/basket/BasketEmpty.tsx'
import BasketList from '../templates/basket/BasketList.tsx'
import BasketSidebar from '../templates/basket/BasketSidebar.tsx'
import PageHeader from '../templates/PageHeader.tsx'

const BasketPage = () => {
  const { products, basket } = useAppStore()
  const [totals, setTotals] = useState<IBasketTotal[]>([])

  // ******************************* //

  /** @pure */
  function buildBasketTotal(basket: ICartItem[], productsById: Record<number, IProduct>): IBasketTotal[] {
    return basket.reduce<IBasketTotal[]>((arr, it) => {
      if (Object.hasOwn(productsById, it.productId)) {
        arr.push({
          id: it.productId,
          total: productsById[it.productId].price * it.quantity,
        })
      }

      return arr
    }, [])
  }

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

            <BasketSidebar subtotal={subtotal} total={total} />
          </div>
        )
      }
    </>
  )
}

export default BasketPage