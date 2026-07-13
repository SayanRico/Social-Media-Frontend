import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';
import * as Icons from 'react-icons/fi';

/**
 * StatusCard Component
 * Premium/status indicator card with optional action button
 * 
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} status - Status: 'active', 'inactive', 'pending', 'expired', 'premium'
 * @param {React.Component} icon - Optional custom icon
 * @param {Object} action - Optional action: { text: string, onClick: function }
 * @param {string} className - Additional CSS classes
 */
const StatusCard = ({
  title,
  description,
  status = 'inactive',
  icon,
  action,
  className = '',
}) => {
  const { isDarkMode } = useSafeTheme();

  const statusConfig = {
    active: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      border: 'border-green-300',
      badge: 'bg-green-100 text-green-800',
      icon: Icons.FiCheckCircle,
      text: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700',
    },
    inactive: {
      bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
      border: 'border-gray-300',
      badge: 'bg-gray-100 text-gray-800',
      icon: Icons.FiXCircle,
      text: 'text-gray-600',
      button: 'bg-gray-600 hover:bg-gray-700',
    },
    pending: {
      bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      border: 'border-yellow-300',
      badge: 'bg-yellow-100 text-yellow-800',
      icon: Icons.FiClock,
      text: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700',
    },
    expired: {
      bg: 'bg-gradient-to-br from-red-50 to-rose-50',
      border: 'border-red-300',
      badge: 'bg-red-100 text-red-800',
      icon: Icons.FiAlertTriangle,
      text: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
    },
    premium: {
      bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      border: 'border-purple-300',
      badge: 'bg-purple-100 text-purple-800',
      icon: Icons.FiStar,
      text: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
    },
  };

  const config = statusConfig[status] || statusConfig.inactive;
  const DefaultIcon = config.icon;
  const IconComponent = icon || DefaultIcon;

  const statusLabel = {
    active: '✓ Active',
    inactive: 'Inactive',
    pending: '⏳ Pending',
    expired: '✕ Expired',
    premium: '★ Premium',
  };

  // Handle icon - can be component or JSX element
  const renderIcon = () => {
    if (icon) {
      // If icon is already a JSX element, render it directly
      if (React.isValidElement(icon)) {
        return icon;
      }
      // If icon is a component function, render it with React.createElement
      if (typeof icon === 'function') {
        return React.createElement(icon);
      }
    }
    // Default icon
    return <DefaultIcon />;
  };

  const bgClass = isDarkMode
    ? config.bg.replace(/from-.*?-50/g, 'from-gray-800').replace(/to-.*?-50/g, 'to-gray-700').replace(/border-.*?-300/g, 'border-gray-600')
    : config.bg;

  return (
    <div className={`
      ${bgClass} border ${isDarkMode ? config.border.replace(/border-(\\w+)-(300)/g, 'border-$1-600') : config.border} rounded-2xl p-6 shadow-sm
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden
      ${className}
    `}>
      {/* Header with Icon and Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 z-10 relative">
          <div className={`${config.text} text-4xl p-3.5 ${isDarkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'} rounded-2xl shadow-sm`}>
            {renderIcon()}
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`${isDarkMode ? config.badge.replace(/bg-(\\w+)-(100)/g, 'bg-$1-800').replace(/text-(\\w+)-(800)/g, 'text-$1-200') : config.badge} text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap`}>
          {statusLabel[status]}
        </span>
      </div>

      {/* Divider */}
      <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} my-4`} />

      {/* Status Details */}
      <div className="mb-4">
        <p className={`text-sm font-semibold ${config.text} mb-2`}>
          Current Status: <span className="font-bold">{statusLabel[status]}</span>
        </p>
        <div className={`text-xs ${config.text} opacity-75 font-medium`}>
          {status === 'active' && 'Your plan is currently active and running smoothly.'}
          {status === 'inactive' && 'Your plan is inactive. Upgrade to get started.'}
          {status === 'pending' && 'Your plan activation is pending. Please complete payment.'}
          {status === 'expired' && 'Your plan has expired. Renew now to continue.'}
          {status === 'premium' && 'You have premium access with all features unlocked.'}
        </div>
      </div>

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className={`
            w-full ${config.button} text-white font-semibold
            py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5
            mt-4
          `}
        >
          {action.text}
        </button>
      )}
    </div>
  );
};

export default StatusCard;
