import React from 'react';
import { FiAlertTriangle, FiCheck, FiX } from 'react-icons/fi';
import useSafeTheme from '../../hooks/useSafeTheme';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // 'warning', 'danger', 'info', 'success'
  confirmButtonClass = '',
  cancelButtonClass = '',
  icon = null
}) => {
  const { isDarkMode } = useSafeTheme();

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <FiAlertTriangle className="w-6 h-6 text-red-600" />,
          iconBg: 'bg-red-100',
          confirmClass: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case 'warning':
        return {
          icon: <FiAlertTriangle className="w-6 h-6 text-yellow-600" />,
          iconBg: 'bg-yellow-100',
          confirmClass: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      case 'info':
        return {
          icon: <FiAlertTriangle className="w-6 h-6 text-blue-600" />,
          iconBg: 'bg-blue-100',
          confirmClass: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      case 'success':
        return {
          icon: <FiCheck className="w-6 h-6 text-green-600" />,
          iconBg: 'bg-green-100',
          confirmClass: 'bg-green-600 hover:bg-green-700 text-white'
        };
      default:
        return {
          icon: icon || <FiAlertTriangle className="w-6 h-6 text-gray-600" />,
          iconBg: 'bg-gray-100',
          confirmClass: 'bg-gray-600 hover:bg-gray-700 text-white'
        };
    }
  };

  const typeStyles = getTypeStyles();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className={`rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all scale-100 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        {/* Header */}
        <div className={`px-6 py-5 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
          <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${typeStyles.iconBg}`}>
              {typeStyles.icon}
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className={`px-6 py-5 rounded-b-2xl flex justify-end gap-3 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          <button
            onClick={handleCancel}
            className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 bg-gray-600 border border-gray-500 hover:bg-gray-500' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'} ${cancelButtonClass}`}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${confirmButtonClass || typeStyles.confirmClass}`}
          >
            {type === 'danger' && <FiX className="w-4 h-4 mr-2" />}
            {type === 'success' && <FiCheck className="w-4 h-4 mr-2" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
