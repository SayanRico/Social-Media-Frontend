import React from 'react';
import * as Icons from 'react-icons/fi';
import useSafeTheme from '../../hooks/useSafeTheme';

/**
 * PageHeader Component
 * Displays a gradient header section with title, subtitle, and optional right content
 *
 * @param {string} title - Main title text
 * @param {string} subtitle - Subtitle/description text
 * @param {string} variant - 'gradient' (default), 'solid', or 'minimal'
 * @param {string} gradient - Gradient direction (e.g., 'from-blue-600 to-indigo-600')
 * @param {React.Component} icon - Optional icon component
 * @param {React.Component} rightContent - Optional content for right side
 * @param {React.Component} primaryAction - Backward-compatible alias for right-side action content
 * @param {string} className - Additional CSS classes
 */
const PageHeader = ({
  title,
  subtitle,
  variant = 'gradient',
  gradient = 'brand',
  icon,
  rightContent,
  primaryAction,
  className = '',
}) => {
  const { isDarkMode } = useSafeTheme();
  const resolvedRightContent = rightContent || primaryAction;
  const gradientClass = gradient === 'brand'
    ? 'bg-[linear-gradient(90deg,var(--brand-600),var(--brand-800))]'
    : `bg-gradient-to-r ${gradient}`;

  const variantClasses = {
    gradient: isDarkMode
      ? `${gradientClass} text-white shadow-xl rounded-2xl p-6 sm:p-8 pt-safe-top backdrop-blur-xl border border-white/15 ring-1 ring-white/10 relative overflow-visible`
      : `${gradientClass} text-white shadow-lg rounded-2xl p-6 sm:p-8 pt-safe-top relative border border-white/20 ring-1 ring-black/5 shadow-[0_24px_50px_-20px_rgba(37,99,235,0.35)]`,
    nexus: isDarkMode
      ? `relative rounded-[2.5rem] p-8 sm:p-10 pt-safe-top border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]`
      : `relative rounded-[2.5rem] p-8 sm:p-10 pt-safe-top border border-[color:var(--brand-200)]/60 bg-[color:var(--brand-100)]/80 backdrop-blur-3xl shadow-[0_20px_50px_-20px_var(--brand-500)]`,
    solid:
      'bg-[color:var(--brand-600)] text-white shadow-lg rounded-2xl p-6 sm:p-8 pt-safe-top relative border border-white/15 ring-1 ring-black/10 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.45)] overflow-visible',
    minimal: isDarkMode
      ? 'bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 sm:p-6 pt-safe-top backdrop-blur-md'
      : 'bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 pt-safe-top shadow-sm',
  };

  const textColor = variant === 'minimal' ? (isDarkMode ? 'text-white' : 'text-gray-900') : (variant === 'nexus' ? (isDarkMode ? 'text-white' : 'text-[color:var(--brand-900)]') : 'text-white');
  const subtitleColor = variant === 'minimal' ? (isDarkMode ? 'text-gray-400' : 'text-gray-600') :
    variant === 'nexus' ? (isDarkMode ? 'text-slate-400' : 'text-[color:var(--brand-700)]/60') :
      variant === 'gradient' ? 'text-blue-100' : 'text-gray-400';

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {(variant === 'gradient' || variant === 'solid') && (
        <>
          <div
            className="pointer-events-none absolute top-0 left-6 right-6 sm:left-10 sm:right-10 h-px max-w-2xl mx-auto bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-90 z-20 rounded-full"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-12 right-4 sm:right-8 h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-white/15 blur-3xl opacity-60 dark:opacity-40 z-[1]"
            aria-hidden
          />
        </>
      )}
      {variant === 'nexus' && (
        <div
          className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
            style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
          />
          <div
            className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] transition-all duration-700 ${isDarkMode
              ? 'bg-[color:var(--brand-600)]/10'
              : 'bg-[color:var(--brand-400)]/20'
              }`}
          />
          <div
            className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px] transition-all duration-700 ${isDarkMode
              ? 'bg-[color:var(--brand-700)]/10'
              : 'bg-[color:var(--brand-300)]/20'
              }`}
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 relative z-10">
        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
          {icon && (
            <div className={`${variant === 'minimal'
              ? (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-50 text-blue-600')
              : (variant === 'nexus'
                ? (isDarkMode ? 'bg-[color:var(--brand-600)]/20 text-[color:var(--brand-300)] border border-[color:var(--brand-500)]/30 shadow-[0_0_20px_var(--brand-500)]' : 'bg-[color:var(--brand-600)]/10 text-[color:var(--brand-700)] border border-[color:var(--brand-600)]/20 shadow-lg')
                : 'bg-white/15 backdrop-blur-md border border-white/25 ring-1 ring-white/15 shadow-inner')
              } rounded-2xl p-3 sm:p-4 flex-shrink-0 text-xl sm:text-2xl md:text-3xl transition-transform hover:scale-[1.02] duration-300`}
            >
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0 pt-1">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight break-words ${textColor} ${variant === 'nexus' ? 'tracking-tight' : ''} ${
                variant === 'gradient' || variant === 'solid' || (variant === 'nexus' && isDarkMode)
                  ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]'
                  : ''
              }`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className={`${subtitleColor} text-sm sm:text-base opacity-90 font-medium leading-relaxed max-w-3xl`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {resolvedRightContent ? (
          <div
            className={`${
              variant === 'minimal'
                ? 'flex flex-col sm:flex-row items-stretch sm:items-center gap-3'
                : `flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl p-2 sm:p-3 flex-shrink-0 w-full sm:w-auto z-10 transition-all ${
                    variant === 'nexus'
                      ? isDarkMode
                        ? 'bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15'
                        : 'bg-slate-100/50 backdrop-blur-md border border-slate-200/50 hover:bg-slate-200/50'
                      : 'bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15'
                  }`
            }`}
          >
            <div className="min-w-0 flex flex-wrap items-center justify-end sm:justify-start gap-2">
              {resolvedRightContent}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PageHeader;
