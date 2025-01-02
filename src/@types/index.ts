import { z } from 'zod'
import { productSchema } from '../schemes/product.schema.ts'

type IProduct = z.infer<typeof productSchema>

interface ICartItem {
  productId: number,
  quantity: number,
}

export type {
  IProduct,
  ICartItem
}