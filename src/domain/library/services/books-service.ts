import type { AsyncResult } from '@raghava.indra/result-ts';
import { err } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import type { IBooksRepo } from '../repos/book-repo';
import type { BookListItem } from '../models/book-list-item';
import { BOOK_TITLE_REQUIRED } from '../const/error-codes';

export async function createBook(
    params: { title: string },
    repo: IBooksRepo,
): AsyncResult<BookListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: BOOK_TITLE_REQUIRED }));
    }
    return repo.createBook(params);
}

export async function editBook(
    params: { id: string; title: string },
    repo: IBooksRepo,
): AsyncResult<BookListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: BOOK_TITLE_REQUIRED }));
    }
    return repo.editBook(params);
}

export async function deleteBook(
    params: { id: string },
    repo: IBooksRepo,
): AsyncResult<void, AppError> {
    return repo.deleteBook(params);
}

export async function queryBooks(
    params: { searchQuery?: string | null } | undefined,
    repo: IBooksRepo,
): AsyncResult<BookListItem[], AppError> {
    return repo.queryBooks(params);
}
