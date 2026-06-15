import { ThemeSwitch } from '@modules/core/ui/primitives/theme-switch';
import { useThemeStore, THEMES } from '@modules/core/ui/theme/app-theme-store';

export function AppBar() {
    const { state, dispatch } = useThemeStore();
    const isDark = state.theme === THEMES[1].value;

    return (
        <div className="flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-4 py-2">
            <span className="text-lg font-semibold text-[var(--color-text-strong)]">
                Reader
            </span>
            <ThemeSwitch
                checked={isDark}
                onCheckedChange={(checked) =>
                    dispatch({
                        type: 'SWITCH_THEME',
                        payload: checked ? THEMES[1].value : THEMES[0].value,
                    })
                }
            />
        </div>
    );
}
