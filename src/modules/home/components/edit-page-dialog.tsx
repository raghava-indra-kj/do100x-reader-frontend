import { useState, useEffect } from 'react';
import { Dialog, BaseDialog } from '@modules/core/ui/primitives/dialog';
import { Input } from '@modules/core/ui/primitives/input';
import { Textarea } from '@modules/core/ui/primitives/textarea';
import { Button } from '@modules/core/ui/primitives/button';
import type { Page } from '@modules/pages/models/page';

interface EditPageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    page: Page | null;
    onSubmit: (id: string, title: string, content: string) => void;
}

export function EditPageDialog({ open, onOpenChange, page, onSubmit }: EditPageDialogProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (page) {
            setTitle(page.title);
            setContent(page.content);
        }
    }, [page]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!page || !title.trim()) return;
        onSubmit(page.id, title.trim(), content.trim());
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <BaseDialog.Title className="text-lg font-semibold text-[var(--color-text-strong)]">
                    Edit page
                </BaseDialog.Title>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-body)]">
                        Title
                    </label>
                    <Input
                        value={title}
                        onValueChange={setTitle}
                        placeholder="Enter page title"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-body)]">
                        Content
                    </label>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Paste or type the content you want to read..."
                        minRows={8}
                        maxRows={16}
                    />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="ghost" type="button" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!title.trim()}>
                        Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
