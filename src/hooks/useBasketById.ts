import { useMemo } from 'react'
import { IBasketItem } from '../schemes/basket.schema.ts'

function useBasketById(basket: IBasketItem[]) {
  return useMemo(() => {
    return basket.reduce<Record<number, number>>((acc, it) => {
      acc[it.productId] = it.quantity
      return acc
    }, {})
  }, [basket])
}

export default useBasketById