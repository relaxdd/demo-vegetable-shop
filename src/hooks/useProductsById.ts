import { useMemo } from 'react'
import { IProductItem } from '../schemes/product.schema.ts'

function useProductsById(products: IProductItem[]) {
  return useMemo(() => {
    return products.reduce<Record<number, IProductItem>>((acc, product) => {
      acc[product.id] = product
      return acc
    }, {})
  }, [products])
}

export default useProductsById