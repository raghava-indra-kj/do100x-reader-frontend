import { z } from 'zod';

export type Section = {
    id: string;
    pageId: string;
    bookId: string | null;
    title: string | null;
    rawTitle: string | null;
    level: number;
    content: string | null;
    children: Section[];
};

export const SectionSchema: z.ZodType<Section> = z.object({
    id: z.string(),
    pageId: z.string(),
    bookId: z.string().nullable(),
    title: z.string().nullable(),
    rawTitle: z.string().nullable(),
    level: z.number(),
    content: z.string().nullable(),
    children: z.lazy(() => SectionSchema.array()),
});

export const PageSchema = z.object({
    id: z.string(),
    bookId: z.string().nullable(),
    title: z.string(),
    content: z.string(),
    sections: SectionSchema.array(),
});

export type Page = z.infer<typeof PageSchema>;
