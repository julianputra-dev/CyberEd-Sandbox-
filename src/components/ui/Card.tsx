import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowEffect?: boolean;
  glowColor?: 'neutral' | 'indigo' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glowEffect = false, glowColor = 'neutral', children, ...props }, ref) => {
    const ambientGlow = {
      neutral: 'group-hover:bg-white/[0.04]',
      indigo: 'group-hover:bg-indigo-500/[0.08]',
      cyan: 'group-hover:bg-cyan-500/[0.08]',
      emerald: 'group-hover:bg-emerald-500/[0.08]',
      amber: 'group-hover:bg-amber-500/[0.08]',
      rose: 'group-hover:bg-rose-500/[0.08]',
      violet: 'group-hover:bg-violet-500/[0.08]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out hover:border-white/[0.18]',
          className
        )}
        {...props}
      >
        {glowEffect && (
          <div
            className={cn(
              'pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/[0.01] blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100',
              ambientGlow[glowColor]
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 sm:p-7', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-base sm:text-lg font-semibold leading-snug tracking-tight text-white font-sans', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 sm:p-7 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 sm:p-7 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
