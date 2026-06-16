import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { CurrentUserData } from '../models/current-user';
import type { IAuthRepo } from './auth-repo';

export class AuthRepoApi implements IAuthRepo {
    me({ username, password }: { username: string; password: string }): AsyncResult<CurrentUserData, AppError> {
        throw new Error('Method not implemented.');
    }
}
