import { z } from 'zod';

export const BookListItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.date(),
});

export type BookListItem = z.infer<typeof BookListItemSchema>;
