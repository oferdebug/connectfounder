'use client';

import { motion } from 'framer-motion';
import { Icon } from '../ui/icons';
import { Badge } from '../ui/Badge';

export interface SearchResult {
  id: string;
  name: string;
  companyName: string;
  industry: string;
  fundingStage: string;
  location: string;
  avatarUrl?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin">
          <Icon name="loader" size={24} className="text-blue-500" />
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result, index) => (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              {result.avatarUrl ? (
                <img
                  src={result.avatarUrl}
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-semibold">
                  {result.name[0]}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {result.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{result.companyName}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="default" className="text-xs">
                  {result.industry}
                </Badge>
                <Badge variant="default" className="text-xs">
                  {result.fundingStage}
                </Badge>
                <Badge variant="default" className="text-xs">
                  {result.location}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
