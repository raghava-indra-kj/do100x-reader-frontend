export class PageListItem {
    readonly id: string;
    readonly parentPageId: string | null;
    readonly title: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(params: {
        id: string;
        parentPageId: string | null;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }
    ) {
        this.id = params.id;
        this.parentPageId = params.parentPageId;
        this.title = params.title;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
