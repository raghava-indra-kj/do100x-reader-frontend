export class AppError extends Error {
    errorCode: string | null;
    constructor(params: { message: string; errorCode?: string; cause?: unknown }) {
        super(params.message, { cause: params.cause });
        this.name = 'AppError';
        this.errorCode = params.errorCode ?? null;
    }
}
