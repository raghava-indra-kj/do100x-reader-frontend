import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import type { Root, Heading, PhrasingContent } from 'mdast';

export interface Section {
    id: string;
    title: string;
    level: number;
    content: string;
    children: Section[];
}

function extractText(children: PhrasingContent[]): string {
    return children
        .map((child) => {
            if ('value' in child) return child.value;
            if ('children' in child) return extractText(child.children as PhrasingContent[]);
            return '';
        })
        .join('');
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function ensureUniqueSlug(base: string, existing: Set<string>): string {
    let slug = base;
    let counter = 1;
    while (existing.has(slug)) {
        slug = `${base}-${counter}`;
        counter++;
    }
    existing.add(slug);
    return slug;
}

function serializeContent(nodes: Root['children']): string {
    const processor = unified().use(remarkStringify);
    const root: Root = { type: 'root', children: nodes };
    return String(processor.stringify(root)).trim();
}

export function parseSections(markdown: string, splitLevel: number = 1): Section[] {
    const tree = unified().use(remarkParse).parse(markdown);
    const children = (tree as Root).children;
    const slugSet = new Set<string>();

    const rootSection: Section = {
        id: '',
        title: '',
        level: 0,
        content: '',
        children: [],
    };

    const stack: Section[] = [rootSection];
    let contentBuffer: Root['children'] = [];

    for (const node of children) {
        if (node.type === 'heading') {
            const heading = node as Heading;
            const text = extractText(heading.children as PhrasingContent[]);
            if (!text.trim()) continue;

            if (heading.depth <= splitLevel) {
                if (contentBuffer.length > 0) {
                    stack[stack.length - 1].content += (stack[stack.length - 1].content ? '\n' : '') + serializeContent(contentBuffer);
                    contentBuffer = [];
                }

                const baseSlug = slugify(text);
                const id = ensureUniqueSlug(baseSlug, slugSet);
                const section: Section = {
                    id,
                    title: text,
                    level: heading.depth,
                    content: '',
                    children: [],
                };

                while (stack.length > 1 && stack[stack.length - 1].level >= section.level) {
                    stack.pop();
                }

                stack[stack.length - 1].children.push(section);
                stack.push(section);
            } else {
                contentBuffer.push(node);
            }
        } else {
            contentBuffer.push(node);
        }
    }

    if (contentBuffer.length > 0) {
        stack[stack.length - 1].content += (stack[stack.length - 1].content ? '\n' : '') + serializeContent(contentBuffer);
    }

    if (rootSection.content.trim()) {
        const introSlug = ensureUniqueSlug('introduction', slugSet);
        const introSection: Section = {
            id: introSlug,
            title: 'Introduction',
            level: 1,
            content: rootSection.content,
            children: [],
        };
        rootSection.children.unshift(introSection);
    }

    return rootSection.children;
}

export function flattenSections(sections: Section[]): Section[] {
    const result: Section[] = [];
    for (const section of sections) {
        result.push(section);
        result.push(...flattenSections(section.children));
    }
    return result;
}
