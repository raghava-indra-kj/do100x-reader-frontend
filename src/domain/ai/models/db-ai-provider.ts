import { z } from 'zod';

export const DbAiProviderSchema = z.object({
    id: z.string(),
    baseUrl: z.string(),
    apiKey: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type DbAiProvider = z.infer<typeof DbAiProviderSchema>;