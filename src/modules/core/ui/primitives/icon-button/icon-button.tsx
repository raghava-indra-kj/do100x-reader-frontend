import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@modules/core/ui/lib/cn';

const iconButtonVariants = cva(
    'inline-flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                ghost: 'text-[var(--color-text-body)] hover:bg-[var(--color-surface-soft)]',
                outlined: 'border border-[var(--color-border-default)] bg-[var(--color-surface-canvas)] text-[var(--color-text-body)] hover:bg-[var(--color-surface-soft)]',
                filled: 'bg-[var(--color-surface-soft)] text-[var(--color-text-body)] hover:bg-[var(--color-surface-card)]',
                primary: 'bg-[var(--color-brand)] text-[var(--color-text-on-brand)] hover:bg-[var(--color-brand-hover)]',
            },
            size: {
                sm: 'h-8 w-8 rounded-[var(--radius-sm)]',
                md: 'h-10 w-10 rounded-[var(--radius-md)]',
                lg: 'h-12 w-12 rounded-[var(--radius-md)]',
            },
        },
        defaultVariants: {
            variant: 'ghost',
            size: 'md',
        },
    }
);

export interface IconButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
        VariantProps<typeof iconButtonVariants> {
    children: ReactNode;
    className?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(iconButtonVariants({ variant, size, className }))}
                {...props}
            >
                {children}
            </button>
        );
    }
);
IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
