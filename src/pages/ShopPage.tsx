import '../assets/css/pages/shop.css'
import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { SSRPage } from '../@types/server.ts'
import { useAppDispatch, useAppStore } from '../providers/AppProvider.tsx'
import useBasketById from '../hooks/useBasketById.ts'
import { IBasketItem } from '../schemes/basket.schema.ts'
import { IProductItem } from '../schemes/product.schema.ts'
import ProductCard from '../templates/ProductCard.tsx'
import ShopHeader from '../templates/shop/ShopHeader.tsx'

type ShopPageData = { products: IProductItem[] }

const ShopPage: SSRPage<ShopPageData> = ({ pageData }) => {
  const [products, _] = useState(pageData?.products || [])
  const { basket } = useAppStore()
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState('Default')

  function addToBasket(id: number) {
    const payload: IBasketItem = {
      productId: id,
      quantity: 1,
    }

    dispatch({ action: 'cart/add', payload })
  }

  const basketById = useBasketById(basket)

  const filteredProducts = useMemo(() => {
    if (filter === 'Default') {
      return products
    }

    return [...products].sort((a, b) => {
      switch (filter) {
        case 'A-Z':
          return a.title.localeCompare(b.title)
        case 'By price':
          return a.price - b.price
        default:
          return 0
      }
    })
  }, [products, filter])

  return (
    <>
      <Helmet>
        <title>VegetableShop | Shop page</title>
      </Helmet>

      <ShopHeader
        filter={filter}
        changeFilter={setFilter}
      />

      <div className="product-cards">
        {filteredProducts.map((it) => (
          <ProductCard
            item={it} key={it.id}
            addToBasket={addToBasket}
            isInBasket={Object.hasOwn(basketById, it.id)}
          />
        ))}
      </div>
    </>
  )
}

ShopPage.loadData = async () => {
  const resp = await fetch('http://localhost:5173/api/db/products')
  const products = await resp.json()

  return { products }
}

export type { ShopPageData }
export default ShopPage