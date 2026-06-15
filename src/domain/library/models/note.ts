import { z } from 'zod';

export type NoteSection = {
    id: string;
    pageId: string;
    bookId: string | null;
    title: string | null;
    rawTitle: string | null;
    level: number;
    content: string | null;
    children: NoteSection[];
};

export const NoteSectionSchema: z.ZodType<NoteSection> = z.object({
    id: z.string(),
    pageId: z.string(),
    bookId: z.string().nullable(),
    title: z.string().nullable(),
    rawTitle: z.string().nullable(),
    level: z.number(),
    content: z.string().nullable(),
    children: z.lazy(() => NoteSectionSchema.array()),
});

export const NoteSchema = z.object({
    id: z.string(),
    pageId: z.string(),
    bookId: z.string().nullable(),
    title: z.string(),
    content: z.string(),
    sections: NoteSectionSchema.array(),
});

export type Note = z.infer<typeof NoteSchema>;
