import { z } from 'zod'

const todoSchema = z.strictObject({
  id: z.number().positive().int(),
  userId: z.number().positive().int(),
  title: z.string(),
  completed: z.boolean(),
})

type ITodo = z.infer<typeof todoSchema>

export type { ITodo }
export { todoSchema }