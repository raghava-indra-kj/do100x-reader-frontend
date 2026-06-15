import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@modules/core/ui/lib/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center font-semibold cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-[var(--color-brand)] text-[var(--color-text-on-brand)] hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)]',
                secondary: 'bg-[var(--color-surface-canvas)] text-[var(--color-text-strong)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)]',
                ghost: 'text-[var(--color-text-body)] hover:bg-[var(--color-surface-soft)]',
            },
            size: {
                sm: 'h-8 px-3 text-sm rounded-[var(--radius-md)]',
                md: 'h-10 px-5 text-sm rounded-[var(--radius-md)]',
                lg: 'h-12 px-6 text-base rounded-[var(--radius-md)]',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
