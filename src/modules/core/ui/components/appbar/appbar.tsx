import { Observer } from 'mobx-react-lite';
import { ThemeSelector } from '@modules/core/ui/components/theme-selector';
import { AppBarLogo } from './appbar-logo';
import type { ReactNode } from 'react';

export interface AppBarProps {
    right?: ReactNode;
}

export function AppBar({ right }: AppBarProps) {
    return (
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-4 py-2.5 sm:px-6">
            <AppBarLogo />
            <div className="flex items-center gap-3">
                {right}
                <ThemeSelector className="h-8 py-0 text-xs" />
            </div>
        </header>
    );
}
