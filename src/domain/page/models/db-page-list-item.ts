import { z } from 'zod';

export const DbPageListItemSchema = z.object({
    id: z.string(),
    parentPageId: z.string().nullable(),
    title: z.string(),
    sortOrder: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type DbPageListItem = z.infer<typeof DbPageListItemSchema>;
