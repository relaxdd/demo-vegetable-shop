import { useMemo } from 'react'
import { ICartItem } from '../@types'

function useBasketById(basket: ICartItem[]) {
  return useMemo(() => {
    return basket.reduce<Record<number, number>>((acc, it) => {
      acc[it.productId] = it.quantity
      return acc
    }, {})
  }, [basket])
}

export default useBasketById