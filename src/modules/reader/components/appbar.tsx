import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, AArrowDown, AArrowUp, PanelLeft } from 'lucide-react';
import { IconButton } from '@modules/core/ui/primitives/icon-button';
import { ThemeSwitch } from '@modules/core/ui/primitives/theme-switch';
import { useThemeStore, THEMES } from '@modules/core/ui/theme/app-theme-store';
import { useReaderSettings, canDecrease, canIncrease, SPLIT_LEVELS } from '../store/reader-settings';
import { FONT_FAMILIES } from '../theme/font-families';

export function AppBar({ title }: { title: string }) {
    const navigate = useNavigate();
    const { state: themeState, dispatch: themeDispatch } = useThemeStore();
    const isDark = themeState.theme === THEMES[1].value;
    const { state: settingsState, dispatch: settingsDispatch } = useReaderSettings();

    return (
        <div className="flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-4 py-2">
            <div className="flex items-center gap-4">
                <IconButton variant="ghost" size="sm" aria-label="Back" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} />
                </IconButton>
                <IconButton variant="ghost" size="sm" aria-label="Toggle table of contents" onClick={() => settingsDispatch({ type: 'TOGGLE_TOC' })}>
                    <PanelLeft size={16} />
                </IconButton>
                <span className="text-lg font-semibold text-[var(--color-text-strong)]">
                    {title}
                </span>
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-1">
                    <IconButton
                        variant="ghost"
                        size="sm"
                        aria-label="Decrease font size"
                        disabled={!canDecrease(settingsState)}
                        onClick={() => settingsDispatch({ type: 'DECREASE_FONT' })}
                    >
                        <AArrowDown size={16} />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        size="sm"
                        aria-label="Increase font size"
                        disabled={!canIncrease(settingsState)}
                        onClick={() => settingsDispatch({ type: 'INCREASE_FONT' })}
                    >
                        <AArrowUp size={16} />
                    </IconButton>
                </div>
                <div className="mx-2 h-5 w-px bg-[var(--color-border-default)]" />
                <select
                    value={settingsState.fontFamily}
                    onChange={(e) => settingsDispatch({ type: 'SET_FONT_FAMILY', payload: e.target.value })}
                    className="h-7 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-canvas)] px-2 text-xs text-[var(--color-text-body)] cursor-pointer"
                >
                    {FONT_FAMILIES.map((ff) => (
                        <option key={ff.value} value={ff.value}>
                            {ff.label}
                        </option>
                    ))}
                </select>
                <div className="mx-2 h-5 w-px bg-[var(--color-border-default)]" />
                <select
                    value={settingsState.splitLevel}
                    onChange={(e) => settingsDispatch({ type: 'SET_SPLIT_LEVEL', payload: Number(e.target.value) })}
                    className="h-7 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-canvas)] px-2 text-xs text-[var(--color-text-body)] cursor-pointer"
                >
                    {SPLIT_LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>
                            {level.label}
                        </option>
                    ))}
                </select>
                <div className="mx-2 h-5 w-px bg-[var(--color-border-default)]" />
                <div className="px-1">
                    <ThemeSwitch
                        checked={isDark}
                        onCheckedChange={(checked) =>
                            themeDispatch({
                                type: 'SWITCH_THEME',
                                payload: checked ? THEMES[1].value : THEMES[0].value,
                            })
                        }
                    />
                </div>
                <div className="mx-2 h-5 w-px bg-[var(--color-border-default)]" />
                <IconButton variant="ghost" size="sm" aria-label="Settings" className="ml-1">
                    <Settings size={16} />
                </IconButton>
            </div>
        </div>
    );
}
