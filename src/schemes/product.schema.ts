import { z } from 'zod'

const productSchema = z.strictObject({
  id: z.number().positive().int(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  createdAt: z.string().datetime({ precision: 3, offset: true }),
  images: z.strictObject({ shop: z.string(), cart: z.string() }),
  inStock: z.boolean(),
})

const listOfProductsSchema = z.array(productSchema)

export type IProductItem = z.infer<typeof productSchema>
export type ListOfProductsItem = z.infer<typeof listOfProductsSchema>

export { productSchema, listOfProductsSchema }