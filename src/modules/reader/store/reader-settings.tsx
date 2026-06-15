import { createContext, useContext, useReducer, useEffect, type Dispatch, type ReactNode } from 'react';
import {
    fontSizeSm,
    fontSizeBase,
    fontSizeLg,
    fontSizeXl,
    fontSize2xl,
    fontSize3xl,
    fontSize4xl,
    fontSize5xl,
} from '../theme/font-sizes';
import type { MdViewFontSizes } from '@lib/md-view/types/theme';

const FONT_SCALES: { label: string; value: string; sizes: MdViewFontSizes }[] = [
    { label: 'Sm', value: 'sm', sizes: fontSizeSm },
    { label: 'Base', value: 'base', sizes: fontSizeBase },
    { label: 'Lg', value: 'lg', sizes: fontSizeLg },
    { label: 'Xl', value: 'xl', sizes: fontSizeXl },
    { label: '2Xl', value: '2xl', sizes: fontSize2xl },
    { label: '3Xl', value: '3xl', sizes: fontSize3xl },
    { label: '4Xl', value: '4xl', sizes: fontSize4xl },
    { label: '5Xl', value: '5xl', sizes: fontSize5xl },
];

const STORAGE_KEY_FONT = 'reader-font-scale-index';
const STORAGE_KEY_TOC = 'reader-toc-open';
const STORAGE_KEY_SPLIT_LEVEL = 'reader-split-level';
const STORAGE_KEY_FONT_FAMILY = 'reader-font-family';

const DEFAULT_SCALE_INDEX = 1;
const DEFAULT_SPLIT_LEVEL = 2;
const DEFAULT_FONT_FAMILY = 'lexend';

export const SPLIT_LEVELS = [
    { label: 'H1', value: 1 },
    { label: 'H2', value: 2 },
    { label: 'H3', value: 3 },
    { label: 'H4', value: 4 },
    { label: 'H5', value: 5 },
    { label: 'H6', value: 6 },
];

function getStoredInt(key: string, fallback: number): number {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    const parsed = Number(stored);
    return Number.isNaN(parsed) ? fallback : parsed;
}

function getStoredBool(key: string, fallback: boolean): boolean {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    return stored === 'true';
}

function getStoredString(key: string, fallback: string): string {
    const stored = localStorage.getItem(key);
    return stored ?? fallback;
}

export interface ReaderSettingsState {
    fontScaleIndex: number;
    tocOpen: boolean;
    splitLevel: number;
    fontFamily: string;
}

export type ReaderSettingsAction =
    | { type: 'INCREASE_FONT' }
    | { type: 'DECREASE_FONT' }
    | { type: 'TOGGLE_TOC' }
    | { type: 'SET_SPLIT_LEVEL'; payload: number }
    | { type: 'SET_FONT_FAMILY'; payload: string };

const initialState: ReaderSettingsState = {
    fontScaleIndex: getStoredInt(STORAGE_KEY_FONT, DEFAULT_SCALE_INDEX),
    tocOpen: getStoredBool(STORAGE_KEY_TOC, true),
    splitLevel: getStoredInt(STORAGE_KEY_SPLIT_LEVEL, DEFAULT_SPLIT_LEVEL),
    fontFamily: getStoredString(STORAGE_KEY_FONT_FAMILY, DEFAULT_FONT_FAMILY),
};

export function readerSettingsReducer(state: ReaderSettingsState, action: ReaderSettingsAction): ReaderSettingsState {
    switch (action.type) {
        case 'INCREASE_FONT':
            return { ...state, fontScaleIndex: Math.min(state.fontScaleIndex + 1, FONT_SCALES.length - 1) };
        case 'DECREASE_FONT':
            return { ...state, fontScaleIndex: Math.max(state.fontScaleIndex - 1, 0) };
        case 'TOGGLE_TOC':
            return { ...state, tocOpen: !state.tocOpen };
        case 'SET_SPLIT_LEVEL':
            return { ...state, splitLevel: action.payload };
        case 'SET_FONT_FAMILY':
            return { ...state, fontFamily: action.payload };
        default:
            return state;
    }
}

export function getFontSizes(state: ReaderSettingsState): MdViewFontSizes {
    return FONT_SCALES[state.fontScaleIndex].sizes;
}

export function canDecrease(state: ReaderSettingsState): boolean {
    return state.fontScaleIndex > 0;
}

export function canIncrease(state: ReaderSettingsState): boolean {
    return state.fontScaleIndex < FONT_SCALES.length - 1;
}

const ReaderSettingsContext = createContext<{ state: ReaderSettingsState; dispatch: Dispatch<ReaderSettingsAction> } | null>(null);

export function ReaderSettingsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(readerSettingsReducer, initialState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_FONT, String(state.fontScaleIndex));
    }, [state.fontScaleIndex]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_TOC, String(state.tocOpen));
    }, [state.tocOpen]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_SPLIT_LEVEL, String(state.splitLevel));
    }, [state.splitLevel]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_FONT_FAMILY, state.fontFamily);
    }, [state.fontFamily]);

    return (
        <ReaderSettingsContext.Provider value={{ state, dispatch }}>
            {children}
        </ReaderSettingsContext.Provider>
    );
}

export function useReaderSettings() {
    const ctx = useContext(ReaderSettingsContext);
    if (!ctx) throw new Error('useReaderSettings must be used within ReaderSettingsProvider');
    return ctx;
}
