import { z } from 'zod';

export const DbAiModelSchema = z.object({
    id: z.string(),
    providerId: z.string(),
    name: z.string(),
    modelId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type DbAiModel = z.infer<typeof DbAiModelSchema>;