import { productSchema } from '../schemes/product.schema.ts'

export async function fetchProducts() {
  const resp = await fetch('http://localhost:5173/api/db/products')
  const data = await resp.json() as unknown

  return productSchema.array().parse(data)
}