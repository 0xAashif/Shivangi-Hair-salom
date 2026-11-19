import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex min-h-[44px] w-full rounded-xl border bg-white dark:bg-[#0B0B0C] px-3.5 py-2.5 text-sm text-[#141413] dark:text-[#F4F1EA] placeholder:text-[#78716C] dark:placeholder:text-[#71717A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] disabled:cursor-not-allowed disabled:opacity-50',
        hasError
          ? 'border-rose-500'
          : 'border-stone-900/15 dark:border-white/15',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
