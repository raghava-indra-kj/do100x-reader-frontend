import type { AsyncResult } from '@raghava.indra/result-ts';
import { err, ok } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import { AI_SKILL_NAME_REQUIRED, AI_SKILL_SYSTEM_PROMPT_REQUIRED } from '../const/error-codes';
import type { AiSkill } from '../models/ai-skill';
import type { IAiSkillRepo } from '../repos/ai-skill-repo';
import { toAiSkill } from './ai-mapper';

export async function getSkill(
    params: { skillId: string },
    repo: IAiSkillRepo,
): AsyncResult<AiSkill, AppError> {
    const result = await repo.getSkill(params);
    if (!result.ok) return result;
    return ok(toAiSkill(result.data));
}

export async function createSkill(
    params: { name: string; systemPrompt: string },
    repo: IAiSkillRepo,
): AsyncResult<AiSkill, AppError> {
    if (!params.name.trim()) {
        return err(new AppError({ message: 'Name is required', errorCode: AI_SKILL_NAME_REQUIRED }));
    }
    if (!params.systemPrompt.trim()) {
        return err(new AppError({ message: 'System prompt is required', errorCode: AI_SKILL_SYSTEM_PROMPT_REQUIRED }));
    }
    const result = await repo.createSkill(params);
    if (!result.ok) return result;
    return ok(toAiSkill(result.data));
}

export async function editSkill(
    params: { skillId: string; name: string; systemPrompt: string },
    repo: IAiSkillRepo,
): AsyncResult<AiSkill, AppError> {
    if (!params.name.trim()) {
        return err(new AppError({ message: 'Name is required', errorCode: AI_SKILL_NAME_REQUIRED }));
    }
    if (!params.systemPrompt.trim()) {
        return err(new AppError({ message: 'System prompt is required', errorCode: AI_SKILL_SYSTEM_PROMPT_REQUIRED }));
    }
    const result = await repo.editSkill(params);
    if (!result.ok) return result;
    return ok(toAiSkill(result.data));
}

export async function deleteSkill(
    params: { skillId: string },
    repo: IAiSkillRepo,
): AsyncResult<void, AppError> {
    return repo.deleteSkill(params);
}

export async function querySkills(
    params: { searchQuery?: string | null },
    repo: IAiSkillRepo,
): AsyncResult<AiSkill[], AppError> {
    const result = await repo.querySkills(params);
    if (!result.ok) return result;
    return ok(result.data.map(toAiSkill));
}
