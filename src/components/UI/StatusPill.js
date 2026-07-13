import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';

const TONE_MAP = {
  emerald: {
    light: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dark: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
  },
  blue: {
    light: 'bg-blue-50 text-blue-700 border-blue-200',
    dark: 'bg-blue-500/10 text-blue-300 border-blue-500/20'
  },
  amber: {
    light: 'bg-amber-50 text-amber-700 border-amber-200',
    dark: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
  },
  rose: {
    light: 'bg-rose-50 text-rose-700 border-rose-200',
    dark: 'bg-rose-500/10 text-rose-300 border-rose-500/20'
  },
  slate: {
    light: 'bg-slate-100 text-slate-700 border-slate-200',
    dark: 'bg-white/10 text-slate-300 border-white/10'
  }
};

const StatusPill = ({
  label,
  tone = 'slate',
  className = ''
}) => {
  const { isDarkMode } = useSafeTheme();
  const palette = TONE_MAP[tone] || TONE_MAP.slate;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
        isDarkMode ? palette.dark : palette.light
      } ${className}`}
    >
      {label}
    </span>
  );
};

export default StatusPill;
