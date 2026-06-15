import { z } from 'zod';

export const BookSchema = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.string(),
});

export type Book = z.infer<typeof BookSchema>;
