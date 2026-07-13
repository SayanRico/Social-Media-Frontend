import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';
import Icon from './Icon';
import { formatLeadStatusLabel } from '../../constants/leadStatus';

/**
 * Status Badge Component with icons
 * Displays status with appropriate icon and color
 */
const StatusBadge = ({ 
  status, 
  text,
  showIcon = true,
  size = 'md', // 'sm', 'md', 'lg'
  onClick,
  className = '',
}) => {
  const { isDarkMode } = useSafeTheme();

  const statusConfig = {
    success: {
      bg: isDarkMode ? 'bg-green-900' : 'bg-green-100',
      text: isDarkMode ? 'text-green-200' : 'text-green-800',
      border: isDarkMode ? 'border-green-700' : 'border-green-300',
      color: '#10b981',
      label: 'Success',
    },
    completed: {
      bg: isDarkMode ? 'bg-green-900' : 'bg-green-100',
      text: isDarkMode ? 'text-green-200' : 'text-green-800',
      border: isDarkMode ? 'border-green-700' : 'border-green-300',
      color: '#10b981',
      label: 'Completed',
    },
    approved: {
      bg: isDarkMode ? 'bg-emerald-900' : 'bg-emerald-100',
      text: isDarkMode ? 'text-emerald-200' : 'text-emerald-800',
      border: isDarkMode ? 'border-emerald-700' : 'border-emerald-300',
      color: '#059669',
      label: 'Approved',
    },
    active: {
      bg: isDarkMode ? 'bg-green-900' : 'bg-green-100',
      text: isDarkMode ? 'text-green-200' : 'text-green-800',
      border: isDarkMode ? 'border-green-700' : 'border-green-300',
      color: '#10b981',
      label: 'Active',
    },
    pending: {
      bg: isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100',
      text: isDarkMode ? 'text-yellow-200' : 'text-yellow-800',
      border: isDarkMode ? 'border-yellow-700' : 'border-yellow-300',
      color: '#f59e0b',
      label: 'Pending',
    },
    waiting: {
      bg: isDarkMode ? 'bg-amber-900' : 'bg-amber-100',
      text: isDarkMode ? 'text-amber-200' : 'text-amber-800',
      border: isDarkMode ? 'border-amber-700' : 'border-amber-300',
      color: '#d97706',
      label: 'Waiting',
    },
    error: {
      bg: isDarkMode ? 'bg-red-900' : 'bg-red-100',
      text: isDarkMode ? 'text-red-200' : 'text-red-800',
      border: isDarkMode ? 'border-red-700' : 'border-red-300',
      color: '#ef4444',
      label: 'Error',
    },
    failed: {
      bg: isDarkMode ? 'bg-red-900' : 'bg-red-100',
      text: isDarkMode ? 'text-red-200' : 'text-red-800',
      border: isDarkMode ? 'border-red-700' : 'border-red-300',
      color: '#ef4444',
      label: 'Failed',
    },
    rejected: {
      bg: isDarkMode ? 'bg-red-900' : 'bg-red-100',
      text: isDarkMode ? 'text-red-200' : 'text-red-800',
      border: isDarkMode ? 'border-red-700' : 'border-red-300',
      color: '#ef4444',
      label: 'Rejected',
    },
    warning: {
      bg: isDarkMode ? 'bg-orange-900' : 'bg-orange-100',
      text: isDarkMode ? 'text-orange-200' : 'text-orange-800',
      border: isDarkMode ? 'border-orange-700' : 'border-orange-300',
      color: '#f97316',
      label: 'Warning',
    },
    info: {
      bg: isDarkMode ? 'bg-blue-900' : 'bg-blue-100',
      text: isDarkMode ? 'text-blue-200' : 'text-blue-800',
      border: isDarkMode ? 'border-blue-700' : 'border-blue-300',
      color: '#3b82f6',
      label: 'Info',
    },
    new: {
      bg: isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100',
      text: isDarkMode ? 'text-indigo-200' : 'text-indigo-800',
      border: isDarkMode ? 'border-indigo-700' : 'border-indigo-300',
      color: '#6366f1',
      label: 'New',
    },
    contacted: {
      bg: isDarkMode ? 'bg-sky-900' : 'bg-sky-100',
      text: isDarkMode ? 'text-sky-200' : 'text-sky-800',
      border: isDarkMode ? 'border-sky-700' : 'border-sky-300',
      color: '#0ea5e9',
      label: 'Contacted',
    },
    interested: {
      bg: isDarkMode ? 'bg-cyan-900' : 'bg-cyan-100',
      text: isDarkMode ? 'text-cyan-200' : 'text-cyan-800',
      border: isDarkMode ? 'border-cyan-700' : 'border-cyan-300',
      color: '#06b6d4',
      label: 'Interested',
    },
    demo_scheduled: {
      bg: isDarkMode ? 'bg-violet-900' : 'bg-violet-100',
      text: isDarkMode ? 'text-violet-200' : 'text-violet-800',
      border: isDarkMode ? 'border-violet-700' : 'border-violet-300',
      color: '#8b5cf6',
      label: 'Demo Scheduled',
    },
    demo_done: {
      bg: isDarkMode ? 'bg-fuchsia-900' : 'bg-fuchsia-100',
      text: isDarkMode ? 'text-fuchsia-200' : 'text-fuchsia-800',
      border: isDarkMode ? 'border-fuchsia-700' : 'border-fuchsia-300',
      color: '#d946ef',
      label: 'Demo Done',
    },
    proposal_shared: {
      bg: isDarkMode ? 'bg-amber-900' : 'bg-amber-100',
      text: isDarkMode ? 'text-amber-200' : 'text-amber-800',
      border: isDarkMode ? 'border-amber-700' : 'border-amber-300',
      color: '#f59e0b',
      label: 'Proposal Shared',
    },
    negotiation: {
      bg: isDarkMode ? 'bg-orange-900' : 'bg-orange-100',
      text: isDarkMode ? 'text-orange-200' : 'text-orange-800',
      border: isDarkMode ? 'border-orange-700' : 'border-orange-300',
      color: '#f97316',
      label: 'Negotiation',
    },
    converted: {
      bg: isDarkMode ? 'bg-emerald-900' : 'bg-emerald-100',
      text: isDarkMode ? 'text-emerald-200' : 'text-emerald-800',
      border: isDarkMode ? 'border-emerald-700' : 'border-emerald-300',
      color: '#10b981',
      label: 'Converted',
    },
    not_sure: {
      bg: isDarkMode ? 'bg-slate-800' : 'bg-slate-100',
      text: isDarkMode ? 'text-slate-200' : 'text-slate-700',
      border: isDarkMode ? 'border-slate-600' : 'border-slate-300',
      color: '#94a3b8',
      label: 'Not Sure',
    },
    not_interested: {
      bg: isDarkMode ? 'bg-rose-900' : 'bg-rose-100',
      text: isDarkMode ? 'text-rose-200' : 'text-rose-800',
      border: isDarkMode ? 'border-rose-700' : 'border-rose-300',
      color: '#f43f5e',
      label: 'Not Interested',
    },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    ...statusConfig.info,
    label: formatLeadStatusLabel(status),
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      role="status"
      aria-label={text || config.label}
    >
      {showIcon && (
        <Icon
          variant="status"
          status={status}
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
          color={config.color}
        />
      )}
      <span className="font-medium">{text || config.label}</span>
    </div>
  );
};

export default StatusBadge;
