import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { Page } from '../models/page';
import type { PageListItem } from '../models/page-list-item';

export interface IPagesRepo {

    getPage(params: { bookId: string | null; pageId: string }): AsyncResult<Page, AppError>;

    createPage(params: {
        bookId: string | null;
        title: string;
        content: string;
    }): AsyncResult<PageListItem, AppError>;

    editPage(params: {
        bookId: string | null;
        pageId: string;
        title: string;
        content: string;
    }): AsyncResult<PageListItem, AppError>;

    deletePage(params: { bookId: string | null; pageId: string }): AsyncResult<void, AppError>;

    queryPages(params: {
        bookId: string | null;
        searchQuery?: string | null;
    }): AsyncResult<PageListItem[], AppError>;

}
