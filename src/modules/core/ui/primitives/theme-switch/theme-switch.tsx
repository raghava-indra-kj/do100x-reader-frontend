import { Sun, Moon } from 'lucide-react';
import { Switch } from '@base-ui/react/switch';
import { cn } from '@modules/core/ui/lib/cn';

export interface ThemeSwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export function ThemeSwitch({ checked, onCheckedChange, className }: ThemeSwitchProps) {
    return (
        <Switch.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={cn(
                'flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-soft)] p-0.5 transition-colors duration-150 ease-[ease] data-checked:bg-[var(--color-brand)]',
                className
            )}
        >
            <Switch.Thumb
                className={cn(
                    'flex size-3.5 items-center justify-center rounded-full bg-[var(--color-text-strong)] transition-[translate,background-color] duration-150 ease-[ease] data-checked:translate-x-4 data-checked:bg-white'
                )}
            >
                {checked ? (
                    <Moon size={8} className="text-[var(--navy-300)]" />
                ) : (
                    <Sun size={8} className="text-[var(--amber-500)]" />
                )}
            </Switch.Thumb>
        </Switch.Root>
    );
}
