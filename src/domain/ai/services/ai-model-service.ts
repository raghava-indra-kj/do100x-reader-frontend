import type { AsyncResult } from '@raghava.indra/result-ts';
import { err, ok } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import {
    AI_MODEL_NAME_REQUIRED,
    AI_MODEL_ID_REQUIRED,
    AI_MODEL_PROVIDER_NOT_FOUND,
} from '../const/error-codes';
import type { AiModel } from '../models/ai-model';
import type { IAiModelRepo, IAiProviderRepo } from '../repos/ai-repos';
import { toAiModel, toAiProvider } from './ai-mapper';

export async function getModel(
    params: { modelId: string },
    modelRepo: IAiModelRepo,
    providerRepo: IAiProviderRepo,
): AsyncResult<AiModel, AppError> {
    const result = await modelRepo.getModel(params);
    if (!result.ok) return result;

    const providerResult = await providerRepo.getProvider({ providerId: result.data.providerId });
    const provider = providerResult.ok ? toAiProvider(providerResult.data) : null;

    return ok(toAiModel(result.data, provider));
}

export async function createModel(
    params: { providerId: string; name: string; modelId: string },
    modelRepo: IAiModelRepo,
    providerRepo: IAiProviderRepo,
): AsyncResult<AiModel, AppError> {
    if (!params.name.trim()) {
        return err(new AppError({ message: 'Name is required', errorCode: AI_MODEL_NAME_REQUIRED }));
    }
    if (!params.modelId.trim()) {
        return err(new AppError({ message: 'Model ID is required', errorCode: AI_MODEL_ID_REQUIRED }));
    }
    const providerResult = await providerRepo.getProvider({ providerId: params.providerId });
    if (!providerResult.ok) {
        return err(new AppError({ message: 'Provider not found', errorCode: AI_MODEL_PROVIDER_NOT_FOUND }));
    }

    const result = await modelRepo.createModel(params);
    if (!result.ok) return result;
    return ok(toAiModel(result.data, toAiProvider(providerResult.data)));
}

export async function editModel(
    params: { modelId: string; providerId: string; name: string; modelId: string },
    modelRepo: IAiModelRepo,
    providerRepo: IAiProviderRepo,
): AsyncResult<AiModel, AppError> {
    if (!params.name.trim()) {
        return err(new AppError({ message: 'Name is required', errorCode: AI_MODEL_NAME_REQUIRED }));
    }
    if (!params.modelId.trim()) {
        return err(new AppError({ message: 'Model ID is required', errorCode: AI_MODEL_ID_REQUIRED }));
    }
    const providerResult = await providerRepo.getProvider({ providerId: params.providerId });
    if (!providerResult.ok) {
        return err(new AppError({ message: 'Provider not found', errorCode: AI_MODEL_PROVIDER_NOT_FOUND }));
    }

    const result = await modelRepo.editModel(params);
    if (!result.ok) return result;
    return ok(toAiModel(result.data, toAiProvider(providerResult.data)));
}

export async function deleteModel(
    params: { modelId: string },
    repo: IAiModelRepo,
): AsyncResult<void, AppError> {
    return repo.deleteModel(params);
}

export async function queryModels(
    params: { providerId?: string | null },
    modelRepo: IAiModelRepo,
    providerRepo: IAiProviderRepo,
): AsyncResult<AiModel[], AppError> {
    const result = await modelRepo.queryModels(params);
    if (!result.ok) return result;

    const providersResult = await providerRepo.queryProviders();
    const providerMap = new Map<string, AiProvider>();
    if (providersResult.ok) {
        for (const p of providersResult.data) {
            providerMap.set(p.id, toAiProvider(p));
        }
    }

    return ok(result.data.map((db) => toAiModel(db, providerMap.get(db.providerId) ?? null)));
}