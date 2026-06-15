import { cn } from '@modules/core/ui/lib/cn';
import type { Section } from '../services/section-parser';

interface TocProps {
    sections: Section[];
    activeId: string | null;
    onSectionClick: (id: string) => void;
}

export function Toc({ sections, activeId, onSectionClick }: TocProps) {
    return (
        <nav className="flex flex-col py-3">
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
                    'flex w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm leading-snug transition-colors cursor-pointer',
                    isActive
                        ? 'bg-[var(--color-brand-soft)] text-[var(--color-brand-on-soft)] font-medium'
                        : 'text-[var(--color-text-body)] hover:bg-[var(--color-surface-soft)]',
                    depth > 0 && 'text-[var(--color-text-body)] opacity-80',
                )}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
            >
                <span className="truncate">{section.title}</span>
            </button>
            {section.children.length > 0 && (
                <div className="mt-0.5 flex flex-col">
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
            )}
        </div>
    );
}
