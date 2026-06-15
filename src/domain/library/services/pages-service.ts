import type { AsyncResult } from '@raghava.indra/result-ts';
import { err, ok } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import { PAGE_PARSE_FAILED, PAGE_TITLE_REQUIRED } from '../const/error-codes';
import type { Page } from '../models/page';
import type { PageListItem } from '../models/page-list-item';
import type { IPagesRepo } from '../repos/pages-repo';
import { toPage, toPageListItem } from './page-mapper';

export async function getPage(
    params: { pageId: string },
    repo: IPagesRepo,
): AsyncResult<Page, AppError> {
    const result = await repo.getPage(params);
    if (!result.ok) return result;

    try {
        return ok(toPage(result.data));
    } catch (error) {
        return err(new AppError({ message: 'Failed to parse page content', errorCode: PAGE_PARSE_FAILED, cause: error }));
    }
}

export async function createPage(
    params: { parentPageId: string | null; title: string; content: string },
    repo: IPagesRepo,
): AsyncResult<PageListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: PAGE_TITLE_REQUIRED }));
    }
    const result = await repo.createPage(params);
    if (!result.ok) return result;
    return ok(toPageListItem(result.data));
}

export async function editPage(
    params: { pageId: string; title: string; content: string },
    repo: IPagesRepo,
): AsyncResult<PageListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: PAGE_TITLE_REQUIRED }));
    }
    const result = await repo.editPage(params);
    if (!result.ok) return result;
    return ok(toPageListItem(result.data));
}

export async function deletePage(
    params: { pageId: string },
    repo: IPagesRepo,
): AsyncResult<void, AppError> {
    return repo.deletePage(params);
}

export async function queryPages(
    params: { parentPageId: string | null; searchQuery?: string | null },
    repo: IPagesRepo,
): AsyncResult<PageListItem[], AppError> {
    const result = await repo.queryPages(params);
    if (!result.ok) return result;
    return ok(result.data.map(toPageListItem));
}
