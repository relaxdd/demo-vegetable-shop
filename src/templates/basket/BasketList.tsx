import { FC } from 'react'
import { IProduct } from '../../@types'
import { useAppDispatch, useAppStore } from '../../providers/AppProvider.tsx'
import BasketCard from './BasketCard.tsx'

interface BasketListProps {
  productsById: Record<number, IProduct>
}

const BasketList: FC<BasketListProps> = ({ productsById }) => {
  const { basket } = useAppStore()
  const dispatch = useAppDispatch()

  function changeQuantity(id: number, qty: number) {
    dispatch({ action: 'cart/change', payload: { id, qty } })
  }

  function removeItem(id: number) {
    if (!window.confirm('Are you sure?')) return
    dispatch({ action: 'cart/remove', payload: id })
  }

  return basket.map(((it) => {
    return Object.hasOwn(productsById, it.productId) && (
      <BasketCard
        key={it.productId}
        quantity={it.quantity}
        changeQty={changeQuantity}
        removeItem={removeItem}
        item={productsById[it.productId]!}
      />
    )
  }))
}

export default BasketList