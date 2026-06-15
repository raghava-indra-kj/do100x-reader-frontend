import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPage } from '@modules/pages/services/page-service';
import type { Page } from '@modules/pages/models/page';
import { ReaderView } from './view';

export default function ReaderPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }
        getPage(id).then((result) => {
            if (!result) {
                navigate('/');
                return;
            }
            setPage(result);
            setLoading(false);
        });
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[var(--color-surface-canvas)]">
                <p className="text-[var(--color-text-muted)]">Loading...</p>
            </div>
        );
    }

    if (!page) return null;

    return <ReaderView page={page} />;
}
