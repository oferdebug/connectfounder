'use client';

import { Icon } from '../ui/icons';

export interface SearchHistoryItem {
  id: string;
  query: string;
  filters: {
    industry?: string;
    fundingStage?: string;
    location?: string;
    companySize?: string;
    foundingYear?: string;
    market?: string;
  };
  timestamp: string;
  resultCount: number;
}

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onApply: (item: SearchHistoryItem) => void;
  onClear: () => void;
}

export function SearchHistory({ history, onApply, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onApply(item)}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <Icon name="search" size={16} />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  {item.query || 'Filter-based search'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Object.entries(item.filters)
                    .filter(([, value]) => value)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(' • ')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                {item.resultCount} results
              </span>
              <span className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
              <Icon name="arrowRight" size={16} className="text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
