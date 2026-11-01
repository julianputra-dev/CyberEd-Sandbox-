import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-xs sm:text-sm px-4 py-2 rounded-xl gap-2',
      lg: 'text-sm sm:text-base px-6 py-2.5 rounded-xl gap-2.5',
    };

    const variantStyles = {
      // Solid white with high-contrast subtle 3D top bevel and soft aura
      primary:
        'bg-white text-zinc-950 hover:bg-zinc-100 font-semibold border border-white shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_24px_-4px_rgba(255,255,255,0.25)]',
      // Deep modern SaaS dark surface with razor-sharp inset bevel
      secondary:
        'bg-[#121217]/90 hover:bg-[#181820] text-zinc-100 border border-white/[0.08] hover:border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md',
      // Crisp outline
      outline:
        'bg-transparent hover:bg-white/[0.03] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-white/[0.16]',
      // Subtle ghost
      ghost:
        'bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-100',
      // Controlled danger
      danger:
        'bg-rose-500/10 hover:bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:border-rose-500/30',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
