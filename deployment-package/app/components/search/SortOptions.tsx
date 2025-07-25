'use client';

import { Icon } from '../ui/icons';

interface SortOptionsProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (by: string, order: 'asc' | 'desc') => void;
}

export function SortOptions({ sortBy, sortOrder, onSort }: SortOptionsProps) {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'companyName', label: 'Company Name' },
    { value: 'foundingYear', label: 'Founding Year' },
    { value: 'industry', label: 'Industry' },
    { value: 'location', label: 'Location' },
  ];

  const handleSortChange = (by: string) => {
    if (by === sortBy) {
      onSort(by, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(by, 'asc');
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleSortChange(value)}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === value
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
            {sortBy === value && (
              <Icon
                name={sortOrder === 'asc' ? 'arrowUp' : 'arrowDown'}
                size={16}
                className="text-blue-600"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
