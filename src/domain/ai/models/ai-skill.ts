export class AiSkill {
    readonly id: string;
    readonly name: string;
    readonly systemPrompt: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(
        id: string,
        name: string,
        systemPrompt: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.systemPrompt = systemPrompt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
