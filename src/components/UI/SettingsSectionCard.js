import React from 'react';
import Card from './Card';
import useSafeTheme from '../../hooks/useSafeTheme';

const SettingsSectionCard = ({
  eyebrow,
  title,
  description,
  actions = null,
  children,
  className = '',
  bodyClassName = ''
}) => {
  const { isDarkMode } = useSafeTheme();

  return (
    <Card variant="nexus" className={`p-5 space-y-5 ${className}`} disableContentWrapper>
      {(eyebrow || title || description || actions) && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            {eyebrow && (
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-500">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {title}
              </h3>
            )}
            {description && (
              <p className={`max-w-3xl text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      )}

      <div className={bodyClassName}>
        {children}
      </div>
    </Card>
  );
};

export default SettingsSectionCard;
