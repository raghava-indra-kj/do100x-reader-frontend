import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, AArrowDown, AArrowUp, PanelLeft } from 'lucide-react';
import { Button } from '@modules/core/ui/primitives/button';
import { useReaderSettings, canDecrease, canIncrease } from '../store/reader-settings';

interface AppBarProps {
    title: string;
    onSettingsOpen: () => void;
}

export function AppBar({ title, onSettingsOpen }: AppBarProps) {
    const navigate = useNavigate();
    const { state: settingsState, dispatch: settingsDispatch } = useReaderSettings();

    return (
        <div className="flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-4 py-2">
            <div className="flex items-center gap-4">
                <Button iconOnly variant="ghost" size="sm" aria-label="Back" tooltip="Back" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} />
                </Button>
                <Button iconOnly variant="ghost" size="sm" aria-label="Toggle table of contents" tooltip="Table of contents" onClick={() => settingsDispatch({ type: 'TOGGLE_TOC' })}>
                    <PanelLeft size={16} />
                </Button>
                <span className="text-lg font-semibold text-[var(--color-text-strong)] truncate max-w-[200px]">
                    {title}
                </span>
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-1">
                    <Button
                        iconOnly
                        variant="ghost"
                        size="sm"
                        aria-label="Decrease font size"
                        tooltip="Decrease font size"
                        disabled={!canDecrease(settingsState)}
                        onClick={() => settingsDispatch({ type: 'DECREASE_FONT' })}
                    >
                        <AArrowDown size={16} />
                    </Button>
                    <Button
                        iconOnly
                        variant="ghost"
                        size="sm"
                        aria-label="Increase font size"
                        tooltip="Increase font size"
                        disabled={!canIncrease(settingsState)}
                        onClick={() => settingsDispatch({ type: 'INCREASE_FONT' })}
                    >
                        <AArrowUp size={16} />
                    </Button>
                </div>
                <div className="mx-2 h-5 w-px bg-[var(--color-border-default)]" />
                <Button iconOnly variant="ghost" size="sm" aria-label="Settings" tooltip="Settings" onClick={onSettingsOpen}>
                    <Settings size={16} />
                </Button>
            </div>
        </div>
    );
}
