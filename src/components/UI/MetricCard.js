import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';
import { getIcon } from '../../utils/iconUtils';

/**
 * MetricCard Component
 * Individual resource metric card showing current/max usage with progress bar
 * 
 * @param {string} label - Resource name (e.g., "Tickets", "Users")
 * @param {number} current - Current usage count
 * @param {number} max - Maximum allowed count
 * @param {string} icon - Optional icon key from iconUtils
 * @param {string} color - Color accent: 'blue', 'green', 'purple', 'orange', 'red', 'indigo'
 * @param {boolean} showPercentage - Show percentage above progress bar
 * @param {boolean} showSeverity - Show severity badge (critical/warning/ok)
 * @param {string} className - Additional CSS classes
 */
const MetricCard = ({
  label,
  current,
  max,
  icon,
  color = 'blue',
  showPercentage = true,
  showSeverity = true,
  variant = 'default',
  className = '',
}) => {
  const { isDarkMode } = useSafeTheme();
  const percentage = max > 0 ? Math.round((current / max) * 100) : 0;

  // Determine severity
  let severity = 'ok';
  if (percentage >= 90) severity = 'critical';
  else if (percentage >= 70) severity = 'warning';

  // Color configurations
  const colorConfig = {
    blue: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-blue-50',
      border: isDarkMode ? 'border-gray-700' : 'border-blue-200',
      progress: 'bg-blue-500',
      text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      badge: isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      aura: 'bg-blue-500/10',
    },
    green: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-green-50',
      border: isDarkMode ? 'border-gray-700' : 'border-green-200',
      progress: 'bg-green-500',
      text: isDarkMode ? 'text-green-400' : 'text-green-600',
      badge: isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      aura: 'bg-green-500/10',
    },
    purple: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-purple-50',
      border: isDarkMode ? 'border-gray-700' : 'border-purple-200',
      progress: 'bg-purple-500',
      text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      badge: isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      aura: 'bg-purple-500/10',
    },
    orange: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-orange-50',
      border: isDarkMode ? 'border-gray-700' : 'border-orange-200',
      progress: 'bg-orange-500',
      text: isDarkMode ? 'text-orange-400' : 'text-orange-600',
      badge: isDarkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
      aura: 'bg-orange-500/10',
    },
    red: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-red-50',
      border: isDarkMode ? 'border-gray-700' : 'border-red-200',
      progress: 'bg-red-500',
      text: isDarkMode ? 'text-red-400' : 'text-red-600',
      badge: isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      aura: 'bg-red-500/10',
    },
    indigo: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-indigo-50',
      border: isDarkMode ? 'border-gray-700' : 'border-indigo-200',
      progress: 'bg-indigo-500',
      text: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
      badge: isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      aura: 'bg-indigo-500/10',
    },
  };

  const config = colorConfig[color] || colorConfig.blue;

  // Severity color override for progress bar
  let progressColor = config.progress;
  if (severity === 'critical') progressColor = 'bg-red-500';
  else if (severity === 'warning') progressColor = 'bg-yellow-500';

  // Get icon - use getIcon() if icon prop is provided as string, else use React element directly
  let IconComponent = null;
  if (icon && typeof icon === 'object') {
    // Icon is already a React element from getIcon()
    IconComponent = icon;
  } else if (icon && typeof icon === 'string') {
    // Icon is a string key, get the icon component
    IconComponent = React.createElement(getIcon(icon));
  } else {
    // Default icon
    IconComponent = React.createElement(getIcon('stats'));
  }

  if (variant === 'nexus') {
    return (
      <div className={`relative group overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] p-6 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
        {/* Ambient Aura */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 ${config.aura} rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-700`}></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${isDarkMode ? 'bg-white/10' : 'bg-white/80'} shadow-inner flex items-center justify-center ${config.text} text-2xl`}>
              {typeof IconComponent === 'object' && IconComponent?.type ? IconComponent : React.createElement(IconComponent)}
            </div>
            <div>
              <h3 className={`text-lg font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{label}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resource Matrix</p>            </div>
          </div>
          {severity !== 'ok' && (
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse ${severity === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
              {severity}
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-baseline">
            <div className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {current}
            </div>
            <div className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              / {max === -1 ? '∞' : max}
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full ${progressColor} rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(59,130,246,0.3)]`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span>Usage Intensity</span>
              <span className={severity === 'critical' ? 'text-red-500' : severity === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Status Decoration */}
        <div className="absolute bottom-4 right-6 opacity-5 pointer-events-none">
          {typeof IconComponent === 'object' && IconComponent?.type ? React.cloneElement(IconComponent, { className: 'w-16 h-16' }) : React.createElement(IconComponent, { className: 'w-16 h-16' })}
        </div>
      </div>
    );
  }

  return (
    <div className={`${config.bg} border ${config.border} rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* ... previous implementation ... */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`${config.text} text-lg sm:text-2xl p-2.5 ${isDarkMode ? 'bg-white/5' : 'bg-white'} rounded-xl shadow-sm flex-shrink-0`}>
            {typeof IconComponent === 'object' && IconComponent?.type ? IconComponent : React.createElement(IconComponent)}
          </div>
          <div className="min-w-0">
            <h3 className={`font-semibold text-base sm:text-lg break-words ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Resource usage</p>
          </div>
        </div>

        {showSeverity && (
          <span className={`${config.badge} text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex-shrink-0 whitespace-nowrap`}>
            {severity === 'critical' ? '⚠️ Critical' : severity === 'warning' ? '⚡ Warning' : '✓ OK'}
          </span>
        )}
      </div>

      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between items-end mb-2">
          <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{current}</span>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>of {max}</span>
        </div>

        {showPercentage && (
          <span className={`inline-block text-xs sm:text-sm font-semibold ${config.text} mb-2 sm:mb-3`}>
            {percentage}% used
          </span>
        )}

        <div className={`w-full rounded-full h-2 sm:h-2.5 overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className={`${progressColor} h-full rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      <div className={`text-xs ${isDarkMode ? 'text-gray-400 bg-white/5' : 'text-gray-600 bg-white'} rounded-lg p-2.5 mt-3`}>
        <span className="font-semibold">{max - current}</span> remaining
      </div>
    </div>
  );
};

export default MetricCard;
