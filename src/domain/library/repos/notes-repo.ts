import type { AsyncResult } from '@raghava.indra/result-ts';
import type { AppError } from '../../../core/errors/app-error';
import type { NoteListItem } from '../models/note-list-item';

export interface INotesRepo {

    getNote(params: { bookId: string | null; pageId: string; noteId: string }): AsyncResult<NoteListItem, AppError>;

    createNote(params: {
        bookId: string | null;
        pageId: string;
        title: string;
        content: string;
    }): AsyncResult<NoteListItem, AppError>;

    editNote(params: {
        bookId: string | null;
        pageId: string;
        noteId: string;
        title: string;
        content: string;
    }): AsyncResult<NoteListItem, AppError>;

    deleteNote(params: { bookId: string | null; pageId: string; noteId: string }): AsyncResult<void, AppError>;

    queryNotes(params: {
        bookId: string | null;
        pageId: string;
        searchQuery?: string | null;
    }): AsyncResult<NoteListItem[], AppError>;

}
