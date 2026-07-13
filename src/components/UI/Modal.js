import React from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import useSafeTheme from '../../hooks/useSafeTheme';

/**
 * Modal Component - Reusable dialog with header and body
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  size = 'md',
  variant = 'default', // 'default', 'danger', 'success'
}) => {
  const { isDarkMode } = useSafeTheme();

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-xs sm:max-w-sm',
    md: 'max-w-sm sm:max-w-2xl',
    lg: 'max-w-2xl sm:max-w-4xl',
    xl: 'max-w-4xl sm:max-w-6xl',
    '2xl': 'max-w-5xl sm:max-w-7xl',
  };

  const headerGradients = {
    default: 'bg-[linear-gradient(90deg,var(--brand-600),var(--brand-800))]',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600',
  };

  const isNexus = variant === 'nexus';

  const modalContent = (
    <div className="fixed inset-0 z-[120] bg-black/60 flex items-start sm:items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-md transition-all duration-300">
      <div
        className={`
          relative my-6 sm:my-10 w-full transform transition-all duration-300 scale-100 opacity-100 animate-in fade-in zoom-in-95
          ${(sizeClasses[size] || sizeClasses.md)} max-h-[calc(100vh-3rem)] overflow-y-auto
          ${isNexus
            ? 'rounded-[2.5rem] bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)]'
            : `rounded-2xl shadow-2xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`
          }
        `}
      >
        {/* Header */}
        {!isNexus ? (
          <div className={`sticky top-0 ${headerGradients[variant]} px-6 py-5 flex justify-between items-start gap-4 border-b border-white/10`}>
            <div className="flex-1 min-w-0">
              {icon && <div className="text-2xl sm:text-3xl mb-2">{icon}</div>}
              <h2 className="text-xl sm:text-2xl font-bold text-white break-words">{title}</h2>
              {subtitle && <p className="text-white text-opacity-90 text-xs sm:text-sm mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-all duration-200"
            >
              <FiX size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        ) : (
          <div className="absolute top-6 right-6 z-50">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 group"
            >
              <FiX size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className={`${isNexus ? 'p-0' : 'p-4 sm:p-6'} ${!isNexus && (isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900')}`}>
          {children}
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') {
    return modalContent;
  }

  return createPortal(modalContent, document.body);
};

export default Modal;
