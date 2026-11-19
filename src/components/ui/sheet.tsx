import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] border-l border-stone-900/10 dark:border-white/10 bg-[#F4F1EA] dark:bg-[#0B0B0C] p-6 text-[#141413] dark:text-[#F4F1EA] shadow-2xl flex flex-col justify-between focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        aria-label="Close navigation menu"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#57534E] dark:text-[#A1A1AA] hover:bg-stone-900/5 dark:hover:bg-white/10 cursor-pointer"
      >
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = 'SheetContent';
