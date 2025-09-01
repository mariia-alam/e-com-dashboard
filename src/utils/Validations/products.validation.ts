import { z } from "zod";

export const productSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Product title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1,"Price must be a greater than zero "),
    category: z.string().min(1, "Category is required"),
    thumbnail: z.string().optional(),
});

export type ProductPayload = z.infer<typeof productSchema>;