import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'absolute flex items-center justify-center rounded-full font-medium text-xs',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-white',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border bg-background text-foreground',
      },
      size: {
        default: '-top-1 -right-1 size-4',
        sm: '-top-0.5 -right-0.5 size-3 text-[0.6rem]',
        lg: '-top-1 -right-1 size-5',
        icon: '-top-1 -right-1 size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  badge?: boolean;
  badgeVariant?: VariantProps<typeof badgeVariants>['variant'];
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingText,
  children,
  disabled,
  badge,
  badgeVariant = 'default',
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className={cn(badgeVariants({ variant: badgeVariant, size }))} />
    );
  };

  const content = (
    <>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
      {renderBadge()}
    </>
  );

  if (asChild) {
    return <Comp {...props}>{content}</Comp>;
  }

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </Comp>
  );
};

export { Button, buttonVariants };
export type { ButtonProps };
