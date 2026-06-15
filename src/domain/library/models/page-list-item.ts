import { z } from 'zod';

export const PageListItemSchema = z.object({
    id: z.string(),
    bookId: z.string().nullable(),
    title: z.string(),
    createdAt: z.date(),
});

export type PageListItem = z.infer<typeof PageListItemSchema>;
