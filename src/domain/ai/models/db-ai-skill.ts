import { z } from 'zod';

export const DbAiSkillSchema = z.object({
    id: z.string(),
    name: z.string(),
    systemPrompt: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type DbAiSkill = z.infer<typeof DbAiSkillSchema>;
