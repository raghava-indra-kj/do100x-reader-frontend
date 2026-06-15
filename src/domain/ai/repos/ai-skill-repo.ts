import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { DbAiSkill } from '../models/db-ai-skill';

export interface IAiSkillRepo {
    getSkill(params: { skillId: string }): AsyncResult<DbAiSkill, AppError>;
    createSkill(params: {
        name: string;
        systemPrompt: string;
    }): AsyncResult<DbAiSkill, AppError>;
    editSkill(params: {
        skillId: string;
        name: string;
        systemPrompt: string;
    }): AsyncResult<DbAiSkill, AppError>;
    deleteSkill(params: { skillId: string }): AsyncResult<void, AppError>;
    querySkills(params: {
        searchQuery?: string | null;
    }): AsyncResult<DbAiSkill[], AppError>;
}
