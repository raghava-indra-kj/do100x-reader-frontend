import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { BookListItem } from '../models/book-list-item';

export interface IBooksRepo {

    createBook(params: { title: string }): AsyncResult<BookListItem, AppError>;

    editBook(params: { id: string; title: string }): AsyncResult<BookListItem, AppError>;

    deleteBook(params: { id: string }): AsyncResult<void, AppError>;

    queryBooks(params?: { searchQuery?: string | null }): AsyncResult<BookListItem[], AppError>;

}
