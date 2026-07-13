import React from 'react';
import MetricCard from './MetricCard';
import useSafeTheme from '../../hooks/useSafeTheme';

/**
 * MetricsSection Component
 * Wrapper component that displays multiple metric cards in a responsive grid
 * 
 * @param {string} title - Section title
 * @param {string} subtitle - Optional section subtitle
 * @param {Array} metrics - Array of metrics: [{ label, current, max, color, icon }]
 * @param {number} columns - Number of columns (1-4, default 3)
 * @param {boolean} showSeverity - Show severity badges on cards
 * @param {string} className - Additional CSS classes
 */
const MetricsSection = ({
  title,
  subtitle,
  metrics = [],
  columns = 3,
  showSeverity = true,
  variant = 'default',
  className = '',
}) => {
  const { isDarkMode } = useSafeTheme();
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gridColClass = columnClasses[columns] || columnClasses[3];

  // Calculate overall usage
  const totalCurrent = metrics.reduce((sum, m) => sum + (m.current || 0), 0);
  const totalMax = metrics.reduce((sum, m) => sum + (m.max || 0), 0);
  const overallPercentage = totalMax > 0 ? Math.round((totalCurrent / totalMax) * 100) : 0;

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className={`text-4xl font-black uppercase tracking-tighter italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
            {subtitle && (
              <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{subtitle}</p>
            )}
          </div>

          {/* Overall Usage Telemetry */}
          <div className={`relative overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'} border border-white/10 rounded-[2rem] p-6 min-w-[240px] shadow-xl backdrop-blur-md`}>
            <div className={`absolute -top-10 -right-10 w-24 h-24 ${overallPercentage > 80 ? 'bg-rose-500/10' : 'bg-blue-500/10'} rounded-full blur-[40px]`}></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Total Telemetry</p>
                <p className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {overallPercentage}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregate</p>
                <p className="text-xs font-black text-slate-500 uppercase">{totalCurrent} / {totalMax}</p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${overallPercentage > 80 ? 'bg-rose-500' : 'bg-blue-500'} rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={`grid ${gridColClass} gap-6 md:gap-8`}>
        {metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            label={metric.label}
            current={metric.current}
            max={metric.max}
            color={metric.color || 'blue'}
            icon={metric.icon}
            showPercentage={metric.showPercentage !== false}
            showSeverity={showSeverity}
            variant={variant}
          />
        ))}
      </div>

      {/* Empty State */}
      {metrics.length === 0 && (
        <div className={`text-center py-8 sm:py-12 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-lg`}>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'} font-medium text-sm sm:text-base`}>No metrics available</p>
          <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm mt-1`}>Check back soon for usage data</p>
        </div>
      )}
    </div>
  );
};

export default MetricsSection;
