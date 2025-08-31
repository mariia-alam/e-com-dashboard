import { z } from "zod";

export const productSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(3, "Product title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    thumbnail: z.string().optional(),
});

export type ProductPayload = z.infer<typeof productSchema>;