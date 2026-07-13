import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';

const InfoGrid = ({ 
  children, 
  cols = 4, 
  columns = null,
  gap = '6', 
  className = '', 
  highlighted = false,
  items = null
}) => {
  const { isDarkMode } = useSafeTheme();
  
  // Use columns prop if provided (for items array)
  const colCount = columns || cols;
  
  // Responsive grid columns
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  // Gap classes
  const gapClass = {
    0: 'gap-0',
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  // Base background based on theme
  const baseBackground = isDarkMode 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 to-gray-100';
  
  // Highlight background if needed
  const highlightBackground = highlighted
    ? isDarkMode 
      ? 'bg-gradient-to-br from-gray-700 to-gray-800 ring-1 ring-gray-600' 
      : 'bg-gradient-to-br from-white to-gray-50 ring-1 ring-gray-200 shadow-sm'
    : '';

  // If items array is provided, render it
  const content = items ? items.map((item, idx) => (
    <div key={idx} className={`p-4 rounded-lg border transition-all ${
      isDarkMode
        ? 'bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70'
        : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      {item.icon && <div className="mb-2">{item.icon}</div>}
      <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {item.label}
      </p>
      <p className={`text-lg font-bold ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {item.value}
      </p>
    </div>
  )) : children;

  return (
    <div className={`
      grid 
      ${gridCols[colCount] || gridCols[4]}
      ${gapClass[gap] || gapClass[6]}
      ${baseBackground}
      ${highlightBackground}
      p-6 
      rounded-lg
      ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
      transition-colors duration-200
      ${className}
    `}>
      {content}
    </div>
  );
};

export default InfoGrid;