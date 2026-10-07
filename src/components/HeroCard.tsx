import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  align?: 'left' | 'right';
  badgeColor?: string;
  isDark?: boolean;
}

export const HeroCard = React.forwardRef<HTMLDivElement, HeroCardProps>(
  (
    {
      icon,
      title,
      description,
      onClick,
      badgeColor = 'bg-red-500 text-white',
      isDark = true,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={`group relative text-left w-full max-w-[290px] sm:max-w-[310px] p-5 sm:p-5.5 rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
          isDark
            ? 'bg-black/55 border border-white/15 shadow-[0_12px_36px_-6px_rgba(220,38,38,0.25)] hover:border-red-500/50 hover:shadow-[0_18px_44px_-4px_rgba(220,38,38,0.35)] hover:-translate-y-0.5 text-white'
            : 'bg-white/90 border border-slate-100 shadow-[0_12px_36px_-6px_rgba(220,38,38,0.07),0_4px_12px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_44px_-4px_rgba(220,38,38,0.14),0_6px_18px_-2px_rgba(15,23,42,0.06)] hover:-translate-y-0.5'
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Left circular red badge icon */}
          <div
            className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center shadow-sm shadow-red-500/20 group-hover:scale-105 transition-transform duration-200 ${badgeColor}`}
          >
            {icon}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0 pr-2">
            <h3
              className={`text-[17px] font-bold tracking-tight leading-snug transition-colors ${
                isDark
                  ? 'text-white group-hover:text-red-400'
                  : 'text-slate-900 group-hover:text-red-600'
              }`}
            >
              {title}
            </h3>
            <p
              className={`mt-1 text-[13px] sm:text-[13.5px] leading-relaxed font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Bottom right round arrow trigger button */}
        <div className="mt-3 flex justify-end">
          <div
            aria-hidden="true"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-200 shadow-2xs ${
              isDark
                ? 'border-white/20 bg-white/10 text-white group-hover:border-red-500 group-hover:bg-red-600'
                : 'border-slate-200/90 bg-white text-slate-700 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    );
  }
);

HeroCard.displayName = 'HeroCard';
