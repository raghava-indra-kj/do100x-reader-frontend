import type { AsyncResult } from '@raghava.indra/result-ts';
import { err, ok } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import { AI_CHAT_PROVIDER_NOT_CONFIGURED, AI_CHAT_FAILED } from '../const/error-codes';
import type { AiProvider } from '../models/ai-provider';
import type { AiModel } from '../models/ai-model';
import type { AiChatRole } from '../models/ai-chat-role';
import type { IAiModelRepo, IAiProviderRepo } from '../repos/ai-repos';
import { toAiModel, toAiProvider } from './ai-mapper';

export interface AiChatMessage {
    role: AiChatRole;
    content: string;
}

export interface AiChatResponse {
    content: string;
    model: string;
}

export interface IAiChatClient {
    chat(params: {
        provider: AiProvider;
        model: AiModel;
        messages: AiChatMessage[];
    }): AsyncResult<AiChatResponse, AppError>;
}

export async function sendChat(
    params: { modelId: string; messages: AiChatMessage[] },
    modelRepo: IAiModelRepo,
    providerRepo: IAiProviderRepo,
    chatClient: IAiChatClient,
): AsyncResult<AiChatResponse, AppError> {
    const modelResult = await modelRepo.getModel({ modelId: params.modelId });
    if (!modelResult.ok) return modelResult;

    const providerResult = await providerRepo.getProvider({ providerId: modelResult.data.providerId });
    if (!providerResult.ok) {
        return err(new AppError({ message: 'Provider not configured for this model', errorCode: AI_CHAT_PROVIDER_NOT_CONFIGURED }));
    }

    const provider = toAiProvider(providerResult.data);
    const model = toAiModel(modelResult.data, provider);

    try {
        return await chatClient.chat({ provider, model, messages: params.messages });
    } catch (error) {
        return err(new AppError({ message: 'Chat request failed', errorCode: AI_CHAT_FAILED, cause: error }));
    }
}