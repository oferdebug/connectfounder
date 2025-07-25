'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { Filters, type FilterOptions } from '@/components/search/Filters';
import { SearchResults, type SearchResult } from '@/components/search/SearchResults';
import { SavedSearches, type SavedSearch } from '@/components/search/SavedSearches';
import { SearchHistory, type SearchHistoryItem } from '@/components/search/SearchHistory';
import { KeyboardShortcutsHelp } from "@/components/search/KeyboardShortcutsHelp";
import { Icon } from "@/components/ui/icons";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

// Sample data - Replace with actual API calls
const filterOptions: FilterOptions = {
  industries: [
    "SaaS",
    "Fintech",
    "E-commerce",
    "Healthcare",
    "AI/ML",
    "Blockchain",
    "EdTech",
    "CleanTech",
    "IoT",
    "Gaming",
    "Cybersecurity",
  ],
  fundingStages: [
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Bootstrapped",
    "Revenue Funded",
  ],
  locations: [
    "San Francisco",
    "New York",
    "London",
    "Berlin",
    "Singapore",
    "Tokyo",
    "Remote",
    "Toronto",
    "Tel Aviv",
    "Bangalore",
  ],
  companySizes: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
  foundingYears: [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "Before 2019",
  ],
  markets: [
    "B2B",
    "B2C",
    "B2B2C",
    "Enterprise",
    "SMB",
    "Consumer",
    "Government",
  ],
};

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const filtersPanelRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch("/api/search/founders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (filters: {
    industry?: string;
    fundingStage?: string;
    location?: string;
  }) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch("/api/search/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Filter error:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSearch = async (
    name: string,
    query: string,
    filters: any
  ) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      query,
      filters,
      createdAt: new Date().toISOString(),
    };
    setSavedSearches([newSearch, ...savedSearches]);
    // You could also save this to your backend/localStorage
  };

  const handleDeleteSavedSearch = (id: string) => {
    setSavedSearches(savedSearches.filter((search) => search.id !== id));
    // You could also delete from your backend/localStorage
  };

  const handleApplySavedSearch = (search: SavedSearch) => {
    setCurrentQuery(search.query);
    setCurrentFilters(search.filters);
    handleSearch(search.query);
    handleFilter(search.filters);
  };

  const handleApplyHistoryItem = (item: SearchHistoryItem) => {
    setCurrentQuery(item.query);
    setCurrentFilters(item.filters);
    handleSearch(item.query);
    handleFilter(item.filters);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    // You could also clear from your backend/localStorage
  };

  // Load saved searches and history from localStorage on mount
  useEffect(() => {
    const savedSearchesData = localStorage.getItem("savedSearches");
    const searchHistoryData = localStorage.getItem("searchHistory");

    if (savedSearchesData) {
      setSavedSearches(JSON.parse(savedSearchesData));
    }
    if (searchHistoryData) {
      setSearchHistory(JSON.parse(searchHistoryData));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Keyboard shortcuts configuration
  const shortcuts = [
    {
      key: "/",
      handler: () => {
        searchInputRef.current?.focus();
      },
    },
    {
      key: "f",
      ctrl: true,
      handler: () => {
        filtersPanelRef.current?.scrollIntoView({ behavior: "smooth" });
        const firstSelect = filtersPanelRef.current?.querySelector("select");
        if (firstSelect) {
          (firstSelect as HTMLSelectElement).focus();
        }
      },
    },
    {
      key: "s",
      ctrl: true,
      handler: () => {
        if (currentQuery || Object.keys(currentFilters).length > 0) {
          const saveButton = document.querySelector("[data-save-search]");
          if (saveButton) {
            (saveButton as HTMLButtonElement).click();
          }
        }
      },
    },
    {
      key: "h",
      ctrl: true,
      handler: () => {
        const historySection = document.querySelector("[data-search-history]");
        if (historySection) {
          historySection.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      key: "?",
      handler: () => {
        setShowShortcutsHelp(!showShortcutsHelp);
      },
    },
  ];

  // Register keyboard shortcuts
  useKeyboardShortcuts(shortcuts);

  const shortcutsList = [
    { key: "/", description: "Focus search input" },
    { key: "f", description: "Focus filters", modifier: "ctrl" as const },
    { key: "s", description: "Save current search", modifier: "ctrl" as const },
    { key: "h", description: "View search history", modifier: "ctrl" as const },
    { key: "?", description: "Show/hide keyboard shortcuts" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white">Search Founders</h1>
            <p className="mt-1 text-sm text-white/80">
              Find and connect with founders in your industry or region
            </p>
          </div>
          <div className="flex items-center gap-2">
            {showShortcutsHelp && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-xl w-full max-w-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      Keyboard Shortcuts
                    </h2>
                    <button
                      onClick={() => setShowShortcutsHelp(false)}
                      className="text-white/80 hover:text-white"
                    >
                      <Icon name="close" size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {shortcutsList.map(({ key, description, modifier }) => (
                      <div
                        key={`${modifier || ""}-${key}`}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-white/80">
                          {description}
                        </span>
                        <div className="flex items-center gap-1">
                          {modifier && (
                            <>
                              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white/20 backdrop-blur-sm border border-white/20 rounded">
                                {modifier.toUpperCase()}
                              </kbd>
                              <span className="text-white/60">+</span>
                            </>
                          )}
                          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white/20 backdrop-blur-sm border border-white/20 rounded">
                            {key.toUpperCase()}
                          </kbd>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowShortcutsHelp(true)}
              className="p-2 text-white/80 hover:text-white rounded-md hover:bg-white/10 backdrop-blur-sm"
              title="Keyboard Shortcuts"
            >
              <Icon name="keyboard" size={20} />
            </button>
            <SavedSearches
              searches={savedSearches}
              onApply={handleApplySavedSearch}
              onDelete={handleDeleteSavedSearch}
              onSave={handleSaveSearch}
              currentQuery={currentQuery}
              currentFilters={currentFilters}
            />
          </div>
        </div>

        <div className="space-y-4">
          <SearchBar onSearch={handleSearch} />
          <Filters options={filterOptions} onFilter={handleFilter} />
        </div>

        <SearchResults results={results} isLoading={isLoading} />

        <SearchHistory
          history={searchHistory}
          onApply={handleApplyHistoryItem}
          onClear={handleClearHistory}
        />

        <KeyboardShortcutsHelp shortcuts={shortcutsList} />
      </div>
    </div>
  );
}
