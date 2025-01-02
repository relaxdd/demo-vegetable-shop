import { ICartItem, IProduct } from '../@types'
import { IBasketTotal } from '../hooks/useBasketSidebarData.ts'

export function extractFileName(path: string): string {
  return path.split('/')?.at(-1)?.split('.')?.at(0) || ''
}

export function roundNumber(num: number, step: number): number {
  return Math.round(num * (10 ** step)) / (10 ** step)
}

export function buildBasketTotal(basket: ICartItem[], productsById: Record<number, IProduct>): IBasketTotal[] {
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