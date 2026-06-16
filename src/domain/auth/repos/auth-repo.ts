import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { CurrentUserData } from '../models/current-user';

export interface IAuthRepo {
    me({ username, password }: {
        username: string;
        password: string;
    }): AsyncResult<CurrentUserData, AppError>;
}
