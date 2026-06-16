import { observer } from 'mobx-react-lite';
import { ThemeSwitch } from '@modules/core/ui/primitives/theme-switch';
import { useThemeStore, Theme } from '@modules/core/theme';

export const AppBar = observer(function AppBar() {
    const store = useThemeStore();
    const isDark = store.theme === Theme.DARK;

    return (
        <div className="flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-4 py-2">
            <span className="text-lg font-semibold text-[var(--color-text-strong)]">
                Reader
            </span>
            <ThemeSwitch
                checked={isDark}
                onCheckedChange={(checked) =>
                    store.changeTheme(checked ? Theme.DARK : Theme.LIGHT)
                }
            />
        </div>
    );
});
