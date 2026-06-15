import { FileText } from 'lucide-react';
import { cn } from '@modules/core/ui/lib/cn';
import type { Section } from '../services/section-parser';

interface TocProps {
    sections: Section[];
    activeId: string | null;
    onSectionClick: (id: string) => void;
}

export function Toc({ sections, activeId, onSectionClick }: TocProps) {
    return (
        <nav className="flex flex-col gap-0.5 py-2">
            {sections.map((section) => (
                <TocItem
                    key={section.id}
                    section={section}
                    activeId={activeId}
                    onSectionClick={onSectionClick}
                />
            ))}
        </nav>
    );
}

interface TocItemProps {
    section: Section;
    activeId: string | null;
    onSectionClick: (id: string) => void;
    depth?: number;
}

function TocItem({ section, activeId, onSectionClick, depth = 0 }: TocItemProps) {
    const isActive = activeId === section.id;

    return (
        <div>
            <button
                onClick={() => onSectionClick(section.id)}
                className={cn(
                    'flex w-full items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-left text-sm transition-colors cursor-pointer',
                    isActive
                        ? 'bg-[var(--color-brand-soft)] text-[var(--color-brand-on-soft)] font-medium'
                        : 'text-[var(--color-text-body)] hover:bg-[var(--color-surface-soft)]',
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
                <FileText size={14} className="shrink-0 opacity-50" />
                <span className="truncate">{section.title}</span>
            </button>
            {section.children.map((child) => (
                <TocItem
                    key={child.id}
                    section={child}
                    activeId={activeId}
                    onSectionClick={onSectionClick}
                    depth={depth + 1}
                />
            ))}
        </div>
    );
}
