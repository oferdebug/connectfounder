'use client';

import { useState } from 'react';
import { Icon } from '../ui/icons';

export interface FilterOptions {
  industries: string[];
  fundingStages: string[];
  locations: string[];
  companySizes: string[];
  foundingYears: string[];
  markets: string[];
}

interface FiltersProps {
  options: FilterOptions;
  onFilter: (filters: {
    industry?: string;
    fundingStage?: string;
    location?: string;
  }) => void;
}

export function Filters({ options, onFilter }: FiltersProps) {
  const [filters, setFilters] = useState({
    industry: '',
    fundingStage: '',
    location: '',
    companySize: '',
    foundingYear: '',
    market: '',
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <select
          value={filters.industry}
          onChange={(e) => handleFilterChange('industry', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Industries</option>
          {options.industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Funding Stage
        </label>
        <select
          value={filters.fundingStage}
          onChange={(e) => handleFilterChange('fundingStage', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Stages</option>
          {options.fundingStages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {options.locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Size
        </label>
        <select
          value={filters.companySize}
          onChange={(e) => handleFilterChange('companySize', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Sizes</option>
          {options.companySizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Founding Year
        </label>
        <select
          value={filters.foundingYear}
          onChange={(e) => handleFilterChange('foundingYear', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Years</option>
          {options.foundingYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Market
        </label>
        <select
          value={filters.market}
          onChange={(e) => handleFilterChange('market', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Markets</option>
          {options.markets.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
