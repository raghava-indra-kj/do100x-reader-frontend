import { observer } from 'mobx-react-lite';
import { Dialog, BaseDialog } from '@modules/core/ui/primitives/dialog';
import { ThemeSwitch } from '@modules/core/ui/primitives/theme-switch';
import { useThemeStore, Theme } from '@modules/core/theme';
import { useReaderSettings, SPLIT_LEVELS } from '../store/reader-settings';
import { FONT_FAMILIES } from '../theme/font-families';
import { X } from 'lucide-react';

interface SettingsPanelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SettingsPanel = observer(function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
    const store = useThemeStore();
    const isDark = store.theme === Theme.DARK;
    const { state: settingsState, dispatch: settingsDispatch } = useReaderSettings();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">Settings</h2>
                <BaseDialog.Close className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-sm)] text-[var(--color-text-body)] hover:bg-[var(--color-surface-soft)] cursor-pointer">
                    <X size={16} />
                </BaseDialog.Close>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-[var(--color-text-strong)]">Dark Mode</div>
                        <div className="text-xs text-[var(--color-text-muted)]">Switch between light and dark theme</div>
                    </div>
                    <ThemeSwitch
                        checked={isDark}
                        onCheckedChange={(checked) =>
                            store.changeTheme(checked ? Theme.DARK : Theme.LIGHT)
                        }
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-[var(--color-text-strong)]">Font Family</div>
                        <div className="text-xs text-[var(--color-text-muted)]">Choose the reading font</div>
                    </div>
                    <select
                        value={settingsState.fontFamily}
                        onChange={(e) => settingsDispatch({ type: 'SET_FONT_FAMILY', payload: e.target.value })}
                        className="h-8 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-canvas)] px-3 text-sm text-[var(--color-text-body)] cursor-pointer"
                    >
                        {FONT_FAMILIES.map((ff) => (
                            <option key={ff.value} value={ff.value}>
                                {ff.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-[var(--color-text-strong)]">Heading Level</div>
                        <div className="text-xs text-[var(--color-text-muted)]">Split sections at this heading level</div>
                    </div>
                    <select
                        value={settingsState.splitLevel}
                        onChange={(e) => settingsDispatch({ type: 'SET_SPLIT_LEVEL', payload: Number(e.target.value) })}
                        className="h-8 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-canvas)] px-3 text-sm text-[var(--color-text-body)] cursor-pointer"
                    >
                        {SPLIT_LEVELS.map((level) => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </Dialog>
    );
});
