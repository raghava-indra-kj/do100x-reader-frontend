export const AiChatRole = {
    System: 'system',
    User: 'user',
    Assistant: 'assistant',
} as const;

export type AiChatRole = (typeof AiChatRole)[keyof typeof AiChatRole];
