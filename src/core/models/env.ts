import { z } from 'zod';

export const OpenAiModelSchema = z.object({
    label: z.string(),
    modelId: z.string(),
});

export const OpenAiConfigSchema = z.object({
    baseUrl: z.string(),
    apiKey: z.string(),
    supportedModels: z.array(OpenAiModelSchema),
    defaultModel: z.string(),
});

export const EnvSchema = z.object({
    openAiConfig: OpenAiConfigSchema,
});

export type OpenAiModel = z.infer<typeof OpenAiModelSchema>;
export type OpenAiConfig = z.infer<typeof OpenAiConfigSchema>;
export type Env = z.infer<typeof EnvSchema>;

let _env: Env;

export async function loadEnv(): Promise<Env> {
    const response = await fetch('/env.json');
    const data = await response.json();
    _env = EnvSchema.parse(data);
    return _env;
}

export const env = new Proxy({} as Env, {
    get(_, prop) {
        return (_env as any)[prop];
    },
});