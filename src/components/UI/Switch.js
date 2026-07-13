import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';

const Switch = ({ checked, onChange, disabled = false, size = 'md', className = '' }) => {
    const { isDarkMode } = useSafeTheme();

    const sizes = {
        sm: {
            switch: 'w-8 h-4',
            dot: 'h-3 w-3',
            translate: 'translate-x-4',
        },
        md: {
            switch: 'w-11 h-6',
            dot: 'h-5 w-5',
            translate: 'translate-x-5',
        },
        lg: {
            switch: 'w-14 h-7',
            dot: 'h-6 w-6',
            translate: 'translate-x-7',
        },
    };

    const currentSize = sizes[size] || sizes.md;

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`
        relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0
        ${currentSize.switch}
        ${checked
                    ? (isDarkMode ? 'bg-blue-600 shadow-inner' : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-inner')
                    : (isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-200 border border-gray-300/50')
                }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
        ${isDarkMode ? 'focus:ring-blue-500/20' : 'focus:ring-blue-500/20'}
        ${className}
      `}
        >
            <span
                className={`
          pointer-events-none inline-block rounded-full bg-white shadow-md transform ring-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${currentSize.dot}
          ${checked ? currentSize.translate : 'translate-x-1'}
        `}
            />
        </button>
    );
};

export default Switch;
