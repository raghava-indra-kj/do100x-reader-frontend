import { useState } from 'react';
import { Dialog, BaseDialog } from '@modules/core/ui/primitives/dialog';
import { Input } from '@modules/core/ui/primitives/input';
import { Textarea } from '@modules/core/ui/primitives/textarea';
import { Button } from '@modules/core/ui/primitives/button';

interface NewPageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (title: string, content: string) => void;
}

export function NewPageDialog({ open, onOpenChange, onSubmit }: NewPageDialogProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit(title.trim(), content.trim());
        setTitle('');
        setContent('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <BaseDialog.Title className="text-lg font-semibold text-[var(--color-text-strong)]">
                    New page
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
                        Create
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
