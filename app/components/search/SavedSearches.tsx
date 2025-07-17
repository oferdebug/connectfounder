'use client';

import { useState } from 'react';
import { Icon } from '../ui/icons';

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: {
    industry?: string;
    fundingStage?: string;
    location?: string;
    companySize?: string;
    foundingYear?: string;
    market?: string;
  };
  createdAt: string;
}

interface SavedSearchesProps {
  searches: SavedSearch[];
  onApply: (search: SavedSearch) => void;
  onDelete: (id: string) => void;
  onSave: (name: string, query: string, filters: SavedSearch['filters']) => void;
  currentQuery?: string;
  currentFilters?: SavedSearch['filters'];
}

export function SavedSearches({
  searches,
  onApply,
  onDelete,
  onSave,
  currentQuery,
  currentFilters,
}: SavedSearchesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSave = () => {
    if (newSearchName && (currentQuery || Object.keys(currentFilters || {}).length > 0)) {
      onSave(newSearchName, currentQuery || '', currentFilters || {});
      setNewSearchName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <Icon name="bookmark" size={16} />
        <span>Saved Searches</span>
        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Saved Searches</h3>
              {(currentQuery || Object.keys(currentFilters || {}).length > 0) && (
                <button
                  onClick={() => setShowSaveDialog(true)}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Save Current
                </button>
              )}
            </div>

            {showSaveDialog && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <input
                  type="text"
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  placeholder="Enter search name"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {searches.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No saved searches yet
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searches.map((search) => (
                  <div
                    key={search.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                  >
                    <button
                      onClick={() => onApply(search)}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium text-sm text-gray-900">
                        {search.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(search.createdAt).toLocaleDateString()}
                      </div>
                    </button>
                    <button
                      onClick={() => onDelete(search.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
