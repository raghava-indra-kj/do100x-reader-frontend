import { useEffect, type ReactNode } from 'react';
import {
    ThemeStoreProvider,
    useThemeStore,
    THEMES,
} from './app-theme-store';

export function AppThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeStoreProvider>
            <ThemeEffect />
            {children}
        </ThemeStoreProvider>
    );
}

function ThemeEffect() {
    const { state } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        THEMES.forEach((t) => root.classList.remove(t.value));
        root.classList.add(state.theme);
        localStorage.setItem('theme', state.theme);
    }, [state.theme]);

    return null;
}
