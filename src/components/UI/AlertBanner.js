import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';
import * as Icons from 'react-icons/fi';

/**
 * AlertBanner Component
 * Displays warning, error, info, or success banners with icons and optional items list
 * 
 * @param {string} type - 'warning', 'error', 'info', 'success'
 * @param {string} title - Banner title
 * @param {string} description - Banner description
 * @param {React.Component} icon - Optional custom icon
 * @param {Array} items - Optional array of items to display: [{ label: string, value: string }]
 * @param {Object} action - Optional action button: { text: string, onClick: function }
 * @param {string} className - Additional CSS classes
 */
const AlertBanner = ({
  type = 'info',
  title,
  description,
  icon,
  items = [],
  action,
  className = '',
}) => {
  const { isDarkMode } = useSafeTheme();

  const typeConfig = {
    warning: {
      bg: 'bg-amber-50/80',
      border: 'border-l-4 border-amber-500',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-900',
      textColor: 'text-amber-800',
      buttonClass: 'bg-amber-600 hover:bg-amber-700 shadow-sm',
    },
    error: {
      bg: 'bg-red-50/80',
      border: 'border-l-4 border-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      textColor: 'text-red-800',
      buttonClass: 'bg-red-600 hover:bg-red-700 shadow-sm',
    },
    info: {
      bg: 'bg-blue-50/80',
      border: 'border-l-4 border-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 shadow-sm',
    },
    success: {
      bg: 'bg-green-50/80',
      border: 'border-l-4 border-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
      textColor: 'text-green-800',
      buttonClass: 'bg-green-600 hover:bg-green-700 shadow-sm',
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = Icons[{
    warning: 'FiAlertTriangle',
    error: 'FiAlertCircle',
    info: 'FiInfo',
    success: 'FiCheckCircle',
  }[type]] || Icons.FiInfo;

  const darkBgMap = {
    warning: isDarkMode ? 'bg-amber-900/20 backdrop-blur-md' : 'backdrop-blur-sm ' + config.bg,
    error: isDarkMode ? 'bg-red-900/20 backdrop-blur-md' : 'backdrop-blur-sm ' + config.bg,
    info: isDarkMode ? 'bg-blue-900/20 backdrop-blur-md' : 'backdrop-blur-sm ' + config.bg,
    success: isDarkMode ? 'bg-green-900/20 backdrop-blur-md' : 'backdrop-blur-sm ' + config.bg,
  };

  const darkBorderMap = {
    warning: isDarkMode ? 'border-yellow-700' : config.border,
    error: isDarkMode ? 'border-red-700' : config.border,
    info: isDarkMode ? 'border-blue-700' : config.border,
    success: isDarkMode ? 'border-green-700' : config.border,
  };

  return (
    <div className={`${darkBgMap[type]} ${darkBorderMap[type]} rounded-2xl p-4 sm:p-6 shadow-sm ${className} border-r border-t border-b ${isDarkMode ? 'border-r-white/5 border-t-white/5 border-b-white/5' : 'border-r-gray-100 border-t-gray-100 border-b-gray-100'}`}>
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`${isDarkMode ? config.iconBg.replace(/-(100)/g, '-800') : config.iconBg} rounded-lg p-2 sm:p-3 flex-shrink-0`}>
          {icon ? icon : <IconComponent className={`${config.iconColor} text-xl sm:text-2xl`} />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? config.titleColor.replace(/-(800|900)/g, '-200') : config.titleColor} mb-1 sm:mb-2`}>
            {title}
          </h3>

          {description && (
            <p className={`${isDarkMode ? config.textColor.replace(/-(800|900)/g, '-300') : config.textColor} mb-2 sm:mb-3 text-xs sm:text-sm`}>
              {description}
            </p>
          )}

          {/* Items List */}
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
              {items.map((item, idx) => (
                <span key={idx} className={`${isDarkMode ? config.iconBg.replace(/-(100)/g, '-800') : config.iconBg} ${isDarkMode ? config.textColor.replace(/-(800|900)/g, '-300') : config.textColor} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium`}>
                  {item.label}: {item.value}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          {action && (
            <button
              onClick={action.onClick}
              className={`${config.buttonClass} text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-200 text-xs sm:text-sm`}
            >
              {action.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
