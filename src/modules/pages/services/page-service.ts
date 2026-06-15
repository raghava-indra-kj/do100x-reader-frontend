import { v4 as uuidv4 } from 'uuid';
import type { Page, PageCreateInput, PageEditInput, PageQueryInput } from '../models/page';

const DB_NAME = 'reader-db';
const DB_VERSION = 1;
const STORE_NAME = 'pages';

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                });
                store.createIndex('title', 'title', { unique: false });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function withTransaction<T>(
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
    return openDB().then(
        (db) =>
            new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, mode);
                const store = tx.objectStore(STORE_NAME);
                const request = callback(store);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
                tx.oncomplete = () => db.close();
            })
    );
}

export function createPage(input: PageCreateInput): Promise<Page> {
    const page: Page = {
        id: uuidv4(),
        title: input.title,
        content: input.content,
        createdAt: new Date().toISOString(),
    };
    return withTransaction('readwrite', (store) => store.add(page)).then(() => page);
}

export function getPage(id: string): Promise<Page | null> {
    return withTransaction<Page | null>('readonly', (store) => store.get(id));
}

export function editPage(input: PageEditInput): Promise<Page> {
    return getPage(input.id).then((existing) => {
        if (!existing) throw new Error(`Page with id ${input.id} not found`);
        const updated: Page = {
            ...existing,
            ...(input.title !== null && { title: input.title }),
            ...(input.content !== null && { content: input.content }),
        };
        return withTransaction('readwrite', (store) => store.put(updated)).then(() => updated);
    });
}

export function deletePage(id: string): Promise<void> {
    return withTransaction('readwrite', (store) => store.delete(id)).then(() => {});
}

export function queryPages(input?: PageQueryInput): Promise<Page[]> {
    return withTransaction<Page[]>('readonly', (store) => store.getAll()).then((pages) => {
        let result = pages as Page[];
        if (input?.search !== null && input?.search) {
            const term = input.search.toLowerCase();
            result = result.filter((p) => p.title.toLowerCase().includes(term));
        }
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return result;
    });
}
