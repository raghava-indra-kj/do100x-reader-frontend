export class AiProvider {
    readonly id: string;
    readonly baseUrl: string;
    readonly apiKey: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(
        id: string,
        baseUrl: string,
        apiKey: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}