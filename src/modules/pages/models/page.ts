export interface Page {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

export interface PageCreateInput {
    title: string;
    content: string;
}

export interface PageEditInput {
    id: string;
    title: string | null;
    content: string | null;
}

export interface PageQueryInput {
    search: string | null;
}
