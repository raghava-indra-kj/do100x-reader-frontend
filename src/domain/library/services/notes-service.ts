import type { AsyncResult } from '@raghava.indra/result-ts';
import { err } from '@raghava.indra/result-ts';
import { AppError } from '../../../core/errors/app-error';
import type { INotesRepo } from '../repos/notes-repo';
import type { NoteListItem } from '../models/note-list-item';
import { NOTE_TITLE_REQUIRED } from '../const/error-codes';

export async function getNote(
    params: { bookId: string; pageId: string; noteId: string },
    repo: INotesRepo,
): AsyncResult<NoteListItem, AppError> {
    return repo.getNote(params);
}

export async function createNote(
    params: { bookId: string; pageId: string; title: string; content: string },
    repo: INotesRepo,
): AsyncResult<NoteListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: NOTE_TITLE_REQUIRED }));
    }
    return repo.createNote(params);
}

export async function editNote(
    params: { bookId: string; pageId: string; noteId: string; title: string; content: string },
    repo: INotesRepo,
): AsyncResult<NoteListItem, AppError> {
    if (!params.title.trim()) {
        return err(new AppError({ message: 'Title is required', errorCode: NOTE_TITLE_REQUIRED }));
    }
    return repo.editNote(params);
}

export async function deleteNote(
    params: { bookId: string; pageId: string; noteId: string },
    repo: INotesRepo,
): AsyncResult<void, AppError> {
    return repo.deleteNote(params);
}

export async function queryNotes(
    params: { bookId: string; pageId: string; searchQuery?: string | null },
    repo: INotesRepo,
): AsyncResult<NoteListItem[], AppError> {
    return repo.queryNotes(params);
}
