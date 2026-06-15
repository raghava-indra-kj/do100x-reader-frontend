import type { AiProvider } from './ai-provider';

export class AiModel {
    readonly id: string;
    readonly providerId: string;
    readonly provider: AiProvider | null;
    readonly name: string;
    readonly modelId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(
        id: string,
        providerId: string,
        name: string,
        modelId: string,
        createdAt: Date,
        updatedAt: Date,
        provider: AiProvider | null = null,
    ) {
        this.id = id;
        this.providerId = providerId;
        this.name = name;
        this.modelId = modelId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.provider = provider;
    }
}