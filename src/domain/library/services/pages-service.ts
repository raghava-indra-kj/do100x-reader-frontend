import type { AsyncResult } from '@raghava.indra/result-ts';
import { err } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import type { IPagesRepo } from '../repos/pages-repo';
import type { Page } from '../models/page';
import type { PageListItem } from '../models/page-list-item';
import { PAGE_TITLE_REQUIRED } from '../const/error-codes';

export async function getPage(
    params: { bookId: string; pageId: string },
    repo: IPagesRepo,
): AsyncResult<Page, AppError> {
    return repo.getPage(params);
}

export async function createPage(
    params: { bookId: string; title: string; content: string },
    repo: IPagesRepo,
): AsyncResult<PageListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: PAGE_TITLE_REQUIRED }));
    }
    return repo.createPage(params);
}

export async function editPage(
    params: { bookId: string; pageId: string; title: string; content: string },
    repo: IPagesRepo,
): AsyncResult<PageListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: PAGE_TITLE_REQUIRED }));
    }
    return repo.editPage(params);
}

export async function deletePage(
    params: { bookId: string; pageId: string },
    repo: IPagesRepo,
): AsyncResult<void, AppError> {
    return repo.deletePage(params);
}

export async function queryPages(
    params: { bookId: string; searchQuery?: string | null },
    repo: IPagesRepo,
): AsyncResult<PageListItem[], AppError> {
    return repo.queryPages(params);
}
