import { useMemo } from 'react'
import { IProduct } from '../@types'

function useProductsById(products: IProduct[]) {
  return useMemo(() => {
    return products.reduce<Record<number, IProduct>>((acc, product) => {
      acc[product.id] = product
      return acc
    }, {})
  }, [products])
}

export default useProductsById