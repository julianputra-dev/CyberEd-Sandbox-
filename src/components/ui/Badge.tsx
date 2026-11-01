import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet' | 'indigo' | 'outline';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-white/[0.03] text-zinc-300 border-white/[0.08] hover:border-white/[0.14]',
    emerald:
      'bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/20',
    amber:
      'bg-amber-500/[0.08] text-amber-400 border-amber-500/20',
    rose:
      'bg-rose-500/[0.08] text-rose-400 border-rose-500/20',
    cyan:
      'bg-cyan-500/[0.08] text-cyan-300 border-cyan-500/20',
    violet:
      'bg-violet-500/[0.08] text-violet-300 border-violet-500/20',
    indigo:
      'bg-indigo-500/[0.08] text-indigo-300 border-indigo-500/20',
    outline:
      'bg-transparent text-zinc-400 border-white/[0.06] hover:border-white/[0.12]',
  };

  const dotColors = {
    default: 'bg-zinc-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    cyan: 'bg-cyan-400',
    violet: 'bg-violet-400',
    indigo: 'bg-indigo-400',
    outline: 'bg-zinc-500',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors select-none tracking-tight font-sans backdrop-blur-md',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};
