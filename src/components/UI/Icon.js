import React from 'react';
import { getIcon, getSidebarIcon, getStatusIcon, getStatusColor } from '../../utils/iconUtils';
import useSafeTheme from '../../hooks/useSafeTheme';

/**
 * Unified Icon Component
 * Usage: <Icon type="leads" size={24} /> or <Icon icon={CustomIcon} />
 */
const Icon = ({ 
  type, 
  icon: CustomIcon, 
  size = 20, 
  color, 
  className = '',
  variant = 'default', // 'default', 'sidebar', 'status'
  status,
  title,
  onClick,
  ...props 
}) => {
  const { isDarkMode } = useSafeTheme();
  let IconComponent;
  let iconColor = color;

  if (CustomIcon) {
    // Use provided custom icon
    IconComponent = CustomIcon;
  } else if (variant === 'sidebar') {
    IconComponent = getSidebarIcon(type);
  } else if (variant === 'status' && status) {
    IconComponent = getStatusIcon(status);
    iconColor = iconColor || getStatusColor(status);
  } else {
    IconComponent = getIcon(type);
  }

  return (
    <IconComponent
      size={size}
      color={iconColor || 'currentColor'}
      className={`transition-all duration-200 hover:scale-110 ${className}`}
      title={title}
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
