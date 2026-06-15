import type { AsyncResult } from '@raghava.indra/result-ts';
import { err, ok } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import {
    AI_PROVIDER_BASE_URL_REQUIRED,
    AI_PROVIDER_API_KEY_REQUIRED,
    AI_PROVIDER_NOT_FOUND,
} from '../const/error-codes';
import type { AiProvider } from '../models/ai-provider';
import type { IAiProviderRepo } from '../repos/ai-repos';
import { toAiProvider } from './ai-mapper';

export async function getProvider(
    params: { providerId: string },
    repo: IAiProviderRepo,
): AsyncResult<AiProvider, AppError> {
    const result = await repo.getProvider(params);
    if (!result.ok) return result;
    return ok(toAiProvider(result.data));
}

export async function createProvider(
    params: { baseUrl: string; apiKey: string },
    repo: IAiProviderRepo,
): AsyncResult<AiProvider, AppError> {
    if (!params.baseUrl.trim()) {
        return err(new AppError({ message: 'Base URL is required', errorCode: AI_PROVIDER_BASE_URL_REQUIRED }));
    }
    if (!params.apiKey.trim()) {
        return err(new AppError({ message: 'API key is required', errorCode: AI_PROVIDER_API_KEY_REQUIRED }));
    }
    const result = await repo.createProvider(params);
    if (!result.ok) return result;
    return ok(toAiProvider(result.data));
}

export async function editProvider(
    params: { providerId: string; baseUrl: string; apiKey: string },
    repo: IAiProviderRepo,
): AsyncResult<AiProvider, AppError> {
    if (!params.baseUrl.trim()) {
        return err(new AppError({ message: 'Base URL is required', errorCode: AI_PROVIDER_BASE_URL_REQUIRED }));
    }
    if (!params.apiKey.trim()) {
        return err(new AppError({ message: 'API key is required', errorCode: AI_PROVIDER_API_KEY_REQUIRED }));
    }
    const result = await repo.editProvider(params);
    if (!result.ok) return result;
    return ok(toAiProvider(result.data));
}

export async function deleteProvider(
    params: { providerId: string },
    repo: IAiProviderRepo,
): AsyncResult<void, AppError> {
    return repo.deleteProvider(params);
}

export async function queryProviders(
    repo: IAiProviderRepo,
): AsyncResult<AiProvider[], AppError> {
    const result = await repo.queryProviders();
    if (!result.ok) return result;
    return ok(result.data.map(toAiProvider));
}