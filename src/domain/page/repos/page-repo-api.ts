import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { DbPage } from '../models/db-page';
import type { DbPageListItem } from '../models/db-page-list-item';
import type { IPagesRepo } from './pages-repo';

export class PageRepoApi implements IPagesRepo {
    getPage(params: { pageId: string }): AsyncResult<DbPage, AppError> {
        throw new Error('Method not implemented.');
    }

    createPage(params: { parentPageId: string | null; title: string; content: string }): AsyncResult<string, AppError> {
        throw new Error('Method not implemented.');
    }

    editPage(params: { pageId: string; title: string; content: string }): AsyncResult<void, AppError> {
        throw new Error('Method not implemented.');
    }

    deletePage(params: { pageId: string }): AsyncResult<void, AppError> {
        throw new Error('Method not implemented.');
    }

    queryPages(params: { parentPageId?: string | null; searchQuery?: string | null }): AsyncResult<DbPageListItem[], AppError> {
        throw new Error('Method not implemented.');
    }

    swapSortOrder(params: { pageId1: string; pageId2: string }): AsyncResult<void, AppError> {
        throw new Error('Method not implemented.');
    }
}
