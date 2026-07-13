import React from 'react';
import Card from './Card';
import useSafeTheme from '../../hooks/useSafeTheme';
import StatusPill from './StatusPill';

const toneClasses = {
  blue: 'text-blue-500',
  emerald: 'text-emerald-500',
  amber: 'text-amber-500',
  rose: 'text-rose-500',
  slate: 'text-slate-500'
};

const SignalStatGrid = ({
  items = [],
  columns = 4,
  className = ''
}) => {
  const { isDarkMode } = useSafeTheme();
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 xl:grid-cols-4'
  }[columns] || 'md:grid-cols-2 xl:grid-cols-4';

  if (!items.length) return null;

  return (
    <div className={`grid gap-4 ${gridClass} ${className}`}>
      {items.map((item) => {
        const tone = item.tone || 'blue';
        return (
          <Card key={item.key || item.label} variant="nexus" className="p-5 !cursor-default hover:!translate-y-0" disableContentWrapper>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  {item.label}
                </p>
                <div className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.value}
                </div>
                {item.helper && (
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.helper}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-3">
                {item.badge && <StatusPill label={item.badge} tone={tone} />}
                {item.icon && (
                  <div className={`rounded-2xl border p-3 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'} ${toneClasses[tone] || toneClasses.blue}`}>
                    {React.cloneElement(item.icon, { className: 'h-5 w-5' })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SignalStatGrid;
