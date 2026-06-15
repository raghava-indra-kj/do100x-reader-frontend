import { z } from 'zod';

export const NoteListItemSchema = z.object({
    id: z.string(),
    pageId: z.string(),
    bookId: z.string().nullable(),
    title: z.string(),
    createdAt: z.date(),
});

export type NoteListItem = z.infer<typeof NoteListItemSchema>;
