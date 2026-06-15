import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@modules/core/ui/lib/cn';

const textareaVariants = cva(
    'w-full border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-strong)] transition-colors placeholder:text-[var(--color-text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
    {
        variants: {
            size: {
                sm: 'px-3 py-2 text-sm rounded-[var(--radius-md)]',
                md: 'px-4 py-2.5 text-sm rounded-[var(--radius-md)]',
                lg: 'px-5 py-3 text-base rounded-[var(--radius-md)]',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(textareaVariants({ size, className }))}
                {...props}
            />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
