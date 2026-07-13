import React from 'react';
import { getIcon } from '../../utils/iconUtils';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    loading = false,
    totalItems,
    itemsPerPage
}) => {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const ChevronLeft = getIcon('chevron_left');
    const ChevronRight = getIcon('chevron_right');

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalItems}</span> results
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className={`
            flex items-center justify-center p-2 rounded-lg border transition-all
            ${currentPage === 1 || loading
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5 shadow-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                        }
          `}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={20} />
                </button>

                <span className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className={`
            flex items-center justify-center p-2 rounded-lg border transition-all
            ${currentPage === totalPages || loading
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5 shadow-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                        }
          `}
                    aria-label="Next page"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
