import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';

export interface ThemeOption {
    label: string;
    value: string;
}

export const THEMES: ThemeOption[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
];

export type Theme = (typeof THEMES)[number]['value'];

export interface ThemeState {
    theme: Theme;
    themes: ThemeOption[];
}

export type ThemeAction = { type: 'SWITCH_THEME'; payload: string };

function isValidTheme(value: string): value is Theme {
    return THEMES.some((t) => t.value === value);
}

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return THEMES[0].value;
    const stored = localStorage.getItem('theme');
    if (stored && isValidTheme(stored)) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : THEMES[0].value;
}

const initialState: ThemeState = {
    theme: getInitialTheme(),
    themes: THEMES,
};

export function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
    switch (action.type) {
        case 'SWITCH_THEME':
            if (isValidTheme(action.payload)) {
                return { ...state, theme: action.payload };
            }
            return state;
        default:
            return state;
    }
}

const ThemeStoreContext = createContext<{ state: ThemeState; dispatch: Dispatch<ThemeAction> } | null>(null);

export function ThemeStoreProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeStoreContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeStoreContext.Provider>
    );
}

export function useThemeStore() {
    const ctx = useContext(ThemeStoreContext);
    if (!ctx) throw new Error('useThemeStore must be used within ThemeStoreProvider');
    return ctx;
}
