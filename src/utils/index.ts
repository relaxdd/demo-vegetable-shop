import { IBasketTotal } from '../hooks/useBasketSidebarData.ts'
import { IBasketItem } from '../schemes/basket.schema.ts'
import { IProductItem } from '../schemes/product.schema.ts'

export function extractFileName(path: string): string {
  return path.split('/')?.at(-1)?.split('.')?.at(0) || ''
}

export function roundNumber(num: number, step: number): number {
  return Math.round(num * (10 ** step)) / (10 ** step)
}

export function buildBasketTotal(basket: IBasketItem[], productsById: Record<number, IProductItem>): IBasketTotal[] {
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