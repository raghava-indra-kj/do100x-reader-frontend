import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, Pencil } from 'lucide-react';
import { IconButton } from '@modules/core/ui/primitives/icon-button';
import type { Page } from '@modules/pages/models/page';
import { pagesPageWithIdRouteValue } from '../../../../boot/routes';

interface PageListItemProps {
    page: Page;
    onDelete: (id: string) => void;
    onEdit: (page: Page) => void;
}

export function PageListItem({ page, onDelete, onEdit }: PageListItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(pagesPageWithIdRouteValue(page.id));
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(page);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(page.id);
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center justify-between rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--color-surface-card-strong)]"
        >
            <div className="flex items-center gap-3 min-w-0">
                <FileText size={18} className="shrink-0 text-[var(--color-text-muted)]" />
                <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-strong)] truncate">
                        {page.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                        {new Date(page.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <IconButton variant="ghost" size="sm" aria-label="Edit page" onClick={handleEdit}>
                    <Pencil size={14} />
                </IconButton>
                <IconButton variant="ghost" size="sm" aria-label="Delete page" onClick={handleDelete}>
                    <Trash2 size={14} />
                </IconButton>
            </div>
        </div>
    );
}
