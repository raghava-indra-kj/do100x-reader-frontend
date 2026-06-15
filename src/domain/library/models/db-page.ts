import { z } from 'zod';

export const DbPageSchema = z.object({
    id: z.string(),
    parentPageId: z.string().nullable(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
});

export type DbPage = z.infer<typeof DbPageSchema>;
