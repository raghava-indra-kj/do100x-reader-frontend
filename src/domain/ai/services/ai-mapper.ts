import { AiProvider } from '../models/ai-provider';
import { AiModel } from '../models/ai-model';
import { AiSkill } from '../models/ai-skill';
import type { DbAiProvider } from '../models/db-ai-provider';
import type { DbAiModel } from '../models/db-ai-model';
import type { DbAiSkill } from '../models/db-ai-skill';

export function toAiProvider(db: DbAiProvider): AiProvider {
    return new AiProvider(db.id, db.baseUrl, db.apiKey, db.createdAt, db.updatedAt);
}

export function toAiModel(db: DbAiModel, provider: AiProvider | null = null): AiModel {
    return new AiModel(db.id, db.providerId, db.name, db.modelId, db.createdAt, db.updatedAt, provider);
}

export function toAiSkill(db: DbAiSkill): AiSkill {
    return new AiSkill(db.id, db.name, db.systemPrompt, db.createdAt, db.updatedAt);
}
