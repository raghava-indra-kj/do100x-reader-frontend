import { parseMarkdown } from '../../../lib/md-parser/parse-markdown';
import type { MdSection } from '../../../lib/md-parser/types';
import type { DbPage } from '../models/db-page';
import type { DbPageListItem } from '../models/db-page-list-item';
import { Page } from '../models/page';
import { PageListItem } from '../models/page-list-item';
import { Section } from '../models/section';

function toSection(mdSection: MdSection, pageId: string): Section {
    return new Section(
        mdSection.id,
        pageId,
        mdSection.title,
        mdSection.rawTitle,
        mdSection.level,
        mdSection.content,
        mdSection.children.map((c) => toSection(c, pageId)),
    );
}

export function toPageListItem(db: DbPageListItem): PageListItem {
    return new PageListItem(db.id, db.parentPageId, db.title, db.createdAt);
}

export function toPage(dbPage: DbPage): Page {
    const doc = parseMarkdown(dbPage.content);
    return new Page(
        dbPage.id,
        dbPage.parentPageId,
        dbPage.title,
        dbPage.content,
        dbPage.createdAt,
        doc.sections.map((s) => toSection(s, dbPage.id)),
    );
}
