import type { Section } from './section';

export { Section } from './section';

export class Page {
    readonly id: string;
    readonly parentPageId: string | null;
    readonly title: string;
    readonly content: string;
    readonly createdAt: Date;
    readonly sections: Section[];

    constructor(
        id: string,
        parentPageId: string | null,
        title: string,
        content: string,
        createdAt: Date,
        sections: Section[],
    ) {
        this.id = id;
        this.parentPageId = parentPageId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.sections = sections;
    }

    isRootPage(): boolean {
        return this.parentPageId === null;
    }
}
