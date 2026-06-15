import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { DbAiProvider } from '../models/db-ai-provider';
import type { DbAiModel } from '../models/db-ai-model';

export interface IAiProviderRepo {
    getProvider(params: { providerId: string }): AsyncResult<DbAiProvider, AppError>;
    createProvider(params: {
        baseUrl: string;
        apiKey: string;
    }): AsyncResult<DbAiProvider, AppError>;
    editProvider(params: {
        providerId: string;
        baseUrl: string;
        apiKey: string;
    }): AsyncResult<DbAiProvider, AppError>;
    deleteProvider(params: { providerId: string }): AsyncResult<void, AppError>;
    queryProviders(): AsyncResult<DbAiProvider[], AppError>;
}

export interface IAiModelRepo {
    getModel(params: { modelId: string }): AsyncResult<DbAiModel, AppError>;
    createModel(params: {
        providerId: string;
        name: string;
        modelId: string;
    }): AsyncResult<DbAiModel, AppError>;
    editModel(params: {
        modelId: string;
        providerId: string;
        name: string;
        modelId: string;
    }): AsyncResult<DbAiModel, AppError>;
    deleteModel(params: { modelId: string }): AsyncResult<void, AppError>;
    queryModels(params: { providerId?: string | null }): AsyncResult<DbAiModel[], AppError>;
}