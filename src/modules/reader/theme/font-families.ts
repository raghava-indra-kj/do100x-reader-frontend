import type { MdViewFonts } from '@lib/md-view/types/theme';

export const FONT_FAMILIES: { label: string; value: string; fonts: MdViewFonts }[] = [
    {
        label: 'Lexend',
        value: 'lexend',
        fonts: {
            heading: "'Lexend', sans-serif",
            prose: "'Lexend', sans-serif",
            code: "'JetBrains Mono', monospace",
        },
    },
    {
        label: 'Atkinson',
        value: 'atkinson',
        fonts: {
            heading: "'Atkinson Hyperlegible', sans-serif",
            prose: "'Atkinson Hyperlegible', sans-serif",
            code: "'JetBrains Mono', monospace",
        },
    },
    {
        label: 'Merriweather',
        value: 'merriweather',
        fonts: {
            heading: "'Merriweather', Georgia, serif",
            prose: "'Merriweather', Georgia, serif",
            code: "'JetBrains Mono', monospace",
        },
    },
];

export const FONT_FAMILY_DEFAULT = 'lexend';

export function getFontFamilyByValue(value: string): MdViewFonts {
    return FONT_FAMILIES.find((f) => f.value === value)?.fonts ?? FONT_FAMILIES[0].fonts;
}
