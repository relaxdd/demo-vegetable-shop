import { z } from 'zod'

const basketSchema = z.object({
  productId: z.number().positive().int(),
  quantity: z.number().positive().step(0.25),
})

const listOfBasket = z.array(basketSchema)

export type IBasketItem = z.infer<typeof basketSchema>
export type ListOfBasket = z.infer<typeof listOfBasket>

export {
  basketSchema,
  listOfBasket,
}