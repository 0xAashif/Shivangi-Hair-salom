import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 cursor-pointer shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#141413] text-[#F4F1EA] hover:bg-[#272724] dark:bg-[#F4F1EA] dark:text-[#070709] dark:hover:bg-[#E5E0D5]',
        brass:
          'bg-[#C5A059] text-[#070709] hover:bg-[#D4B06A]',
        whatsapp:
          'bg-[#25D366] text-white hover:bg-[#20BA59]',
        outline:
          'border border-stone-900/15 dark:border-white/15 bg-transparent text-[#141413] dark:text-[#F4F1EA] hover:bg-stone-900/5 dark:hover:bg-white/10',
        ghost:
          'bg-transparent text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA] hover:bg-stone-900/5 dark:hover:bg-white/10',
      },
      size: {
        default: 'min-h-[44px] px-5 py-2.5',
        sm: 'min-h-[40px] px-4 py-2',
        lg: 'min-h-[48px] px-7 py-3 text-sm',
        icon: 'h-11 w-11 rounded-full p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = 'Button';
