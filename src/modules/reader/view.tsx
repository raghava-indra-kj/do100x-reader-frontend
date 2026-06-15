import { useState, useCallback, useEffect } from 'react';
import type { Page } from '@modules/pages/models/page';
import { AppBar } from './components/appbar';
import { MainView } from './main/main-view';
import { Toc } from './components/toc';
import { ReaderSettingsProvider, useReaderSettings } from './store/reader-settings';
import { parseSections, flattenSections } from './services/section-parser';
import type { Section } from './services/section-parser';

export function ReaderView({ page }: { page: Page }) {
    return (
        <ReaderSettingsProvider>
            <ReaderLayout page={page} />
        </ReaderSettingsProvider>
    );
}

function ReaderLayout({ page }: { page: Page }) {
    const { state: settingsState } = useReaderSettings();
    const [sections, setSections] = useState<Section[]>([]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    useEffect(() => {
        const parsed = parseSections(page.content, settingsState.splitLevel);
        setSections(parsed);
        setCurrentSectionIndex(0);
    }, [page.content, settingsState.splitLevel]);

    const handleSectionClick = useCallback((id: string) => {
        const flat = flattenSections(sections);
        const index = flat.findIndex((s) => s.id === id);
        if (index >= 0) setCurrentSectionIndex(index);
    }, [sections]);

    const activeId = flattenSections(sections)[currentSectionIndex]?.id ?? null;

    return (
        <div className="flex h-screen flex-col bg-[var(--color-surface-canvas)]">
            <AppBar title={page.title} />
            <div className="flex flex-1 overflow-hidden">
                {settingsState.tocOpen && sections.length > 0 && (
                    <aside className="w-60 shrink-0 overflow-y-auto border-r border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-2">
                        <Toc
                            sections={sections}
                            activeId={activeId}
                            onSectionClick={handleSectionClick}
                        />
                    </aside>
                )}
                <MainView
                    sections={sections}
                    currentSectionIndex={currentSectionIndex}
                    onSectionChange={setCurrentSectionIndex}
                />
            </div>
        </div>
    );
}
