export class PageListItem {
    readonly id: string;
    readonly parentPageId: string | null;
    readonly title: string;
    readonly createdAt: Date;

    constructor(
        id: string,
        parentPageId: string | null,
        title: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.parentPageId = parentPageId;
        this.title = title;
        this.createdAt = createdAt;
    }

    isRootPage(): boolean {
        return this.parentPageId === null;
    }
}
