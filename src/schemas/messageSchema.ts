import {z} from 'zod'

export const messagesSchema = z.object({
    content: z
    .string()
    .min(10, {message: "Content must be 10 characters long"})
    .max(300, {message: "Content must be 300 characters atmost"})
})