import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppBar } from './components/appbar';
import { Button } from '@modules/core/ui/primitives/button';
import { IconButton } from '@modules/core/ui/primitives/icon-button';
import { NewPageDialog } from './components/new-page-dialog';
import { EditPageDialog } from './components/edit-page-dialog';
import { PageListItem } from './components/page-list-item';
import { createPage, editPage, deletePage, queryPages } from '@modules/pages/services/page-service';
import type { Page } from '@modules/pages/models/page';

export function HomeView() {
    const navigate = useNavigate();
    const [pages, setPages] = useState<Page[]>([]);
    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    const loadPages = useCallback(async () => {
        const result = await queryPages();
        setPages(result);
    }, []);

    useEffect(() => {
        loadPages();
    }, [loadPages]);

    const handleCreate = async (title: string, content: string) => {
        const page = await createPage({ title, content });
        navigate(`/reader/${page.id}`);
    };

    const handleEdit = (page: Page) => {
        setEditingPage(page);
        setEditDialogOpen(true);
    };

    const handleEditSubmit = async (id: string, title: string, content: string) => {
        await editPage({ id, title, content });
        loadPages();
    };

    const handleDelete = async (id: string) => {
        await deletePage(id);
        loadPages();
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <AppBar />
            <main className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
                            Pages
                        </h1>
                        <IconButton variant="primary" size="sm" aria-label="New page" onClick={() => setNewDialogOpen(true)}>
                            <Plus size={16} />
                        </IconButton>
                    </div>

                    {pages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <p className="text-[var(--color-text-muted)] mb-4">
                                No pages yet. Create your first page to start reading.
                            </p>
                            <Button onClick={() => setNewDialogOpen(true)}>
                                <Plus size={16} className="mr-2" />
                                New page
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {pages.map((page) => (
                                <PageListItem
                                    key={page.id}
                                    page={page}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <NewPageDialog
                open={newDialogOpen}
                onOpenChange={setNewDialogOpen}
                onSubmit={handleCreate}
            />
            <EditPageDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                page={editingPage}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
}
