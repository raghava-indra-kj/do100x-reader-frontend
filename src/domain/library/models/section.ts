export class Section {
    readonly id: string;
    readonly pageId: string;
    readonly title: string | null;
    readonly rawTitle: string | null;
    readonly level: number;
    readonly content: string | null;
    readonly children: Section[];

    constructor(
        id: string,
        pageId: string,
        title: string | null,
        rawTitle: string | null,
        level: number,
        content: string | null,
        children: Section[],
    ) {
        this.id = id;
        this.pageId = pageId;
        this.title = title;
        this.rawTitle = rawTitle;
        this.level = level;
        this.content = content;
        this.children = children;
    }

    isLeaf(): boolean {
        return this.children.length === 0;
    }
}
