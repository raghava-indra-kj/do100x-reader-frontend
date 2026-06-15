import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MarkdownRenderer } from '@lib/md-view';
import { getFontFamilyByValue } from '../theme/font-families';
import { colorLight, colorDark } from '../theme/color-schema';
import { useThemeStore, THEMES } from '@modules/core/ui/theme/app-theme-store';
import { useReaderSettings, getFontSizes } from '../store/reader-settings';
import { flattenSections } from '../services/section-parser';
import type { Section } from '../services/section-parser';
import { Button } from '@modules/core/ui/primitives/button';
import '@lib/md-view/md-view.css';
import '@lib/md-view/md-view-hljs.css';

interface MainViewProps {
    sections: Section[];
    currentSectionIndex: number;
    onSectionChange: (index: number) => void;
}

export function MainView({ sections, currentSectionIndex, onSectionChange }: MainViewProps) {
    const { state: themeState } = useThemeStore();
    const { state: settingsState, dispatch: settingsDispatch } = useReaderSettings();
    const colors = themeState.theme === THEMES[1].value ? colorDark : colorLight;
    const fontSizes = getFontSizes(settingsState);
    const fonts = getFontFamilyByValue(settingsState.fontFamily);
    const scrollRef = useRef<HTMLDivElement>(null);

    const flatSections = flattenSections(sections);
    const currentSection = flatSections[currentSectionIndex];
    const hasPrev = currentSectionIndex > 0;
    const hasNext = currentSectionIndex < flatSections.length - 1;

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [currentSectionIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === 'ArrowLeft' && hasPrev) {
                onSectionChange(currentSectionIndex - 1);
            } else if (e.key === 'ArrowRight' && hasNext) {
                onSectionChange(currentSectionIndex + 1);
            } else if ((e.key === '+' || e.key === '=') && !e.ctrlKey && !e.metaKey) {
                settingsDispatch({ type: 'INCREASE_FONT' });
            } else if (e.key === '-' && !e.ctrlKey && !e.metaKey) {
                settingsDispatch({ type: 'DECREASE_FONT' });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSectionIndex, hasPrev, hasNext, onSectionChange]);

    if (!currentSection) return null;

    const sectionContent = currentSection.level === 0
        ? currentSection.content
        : `${'#'.repeat(currentSection.level)} ${currentSection.title}\n\n${currentSection.content}`;

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full px-8 py-10">
                <MarkdownRenderer
                    markdown={sectionContent}
                    colors={colors}
                    fontSizes={fontSizes}
                    fonts={fonts}
                />
                <div className="mt-12 flex items-center justify-between border-t border-[var(--color-border-default)] pt-4">
                    <Button
                        variant="ghost"
                        disabled={!hasPrev}
                        onClick={() => onSectionChange(currentSectionIndex - 1)}
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Previous
                    </Button>
                    <span className="text-sm text-[var(--color-text-muted)]">
                        {currentSectionIndex + 1} / {flatSections.length}
                    </span>
                    <Button
                        variant="ghost"
                        disabled={!hasNext}
                        onClick={() => onSectionChange(currentSectionIndex + 1)}
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
