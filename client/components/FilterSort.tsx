import { useState } from "react";
import { Filter, SortAsc, SortDesc, X, Calendar, MapPin, DollarSign, Type } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOption = 'name' | 'date' | 'price' | 'location' | 'attendees' | 'rating';
export type SortDirection = 'asc' | 'desc';

interface FilterSortProps {
  onSortChange: (sort: SortOption, direction: SortDirection) => void;
  onFilterChange: (filters: FilterState) => void;
  currentSort: { option: SortOption; direction: SortDirection };
  currentFilters: FilterState;
}

export interface FilterState {
  priceRange: 'all' | 'open' | 'approval_required';
  dateRange: 'all' | 'today' | 'week' | 'month';
  cities: string[];
}

const sortOptions = [
  { value: 'name', label: 'Name', icon: Type },
  { value: 'date', label: 'Date', icon: Calendar },
  { value: 'price', label: 'Registration', icon: DollarSign },
  { value: 'location', label: 'Location', icon: MapPin },
  { value: 'attendees', label: 'Popularity', icon: Filter },
  { value: 'rating', label: 'Rating', icon: Filter },
];

const registrationTypes = [
  { value: 'all', label: 'All Events' },
  { value: 'open', label: 'Open Registration' },
  { value: 'approval_required', label: 'Approval Required' },
];

const dateRanges = [
  { value: 'all', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

const popularCities = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Austin, TX',
  'Seattle, WA',
  'Miami, FL',
  'Boston, MA',
  'Portland, OR',
];

export default function FilterSort({
  onSortChange,
  onFilterChange,
  currentSort,
  currentFilters
}: FilterSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (option: SortOption) => {
    const newDirection = currentSort.option === option && currentSort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(option, newDirection);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({
      ...currentFilters,
      [key]: value
    });
  };

  const handleCityToggle = (city: string) => {
    const newCities = currentFilters.cities.includes(city)
      ? currentFilters.cities.filter(c => c !== city)
      : [...currentFilters.cities, city];
    handleFilterChange('cities', newCities);
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: 'all',
      dateRange: 'all',
      cities: []
    });
  };

  const hasActiveFilters = currentFilters.priceRange !== 'all' || 
                          currentFilters.dateRange !== 'all' || 
                          currentFilters.cities.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm",
          (hasActiveFilters || isOpen) && "ring-2 ring-purple-500 border-purple-300"
        )}
      >
        <Filter className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Filter & Sort
        </span>
        {hasActiveFilters && (
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filter & Sort</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Sort By</h4>
            <div className="grid grid-cols-2 gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value as SortOption)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    currentSort.option === option.value
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                  {currentSort.option === option.value && (
                    currentSort.direction === 'asc' ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    )
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Registration Type Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Registration Type</h4>
            <div className="space-y-2">
              {registrationTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleFilterChange('priceRange', type.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    currentFilters.priceRange === type.value
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Date Range</h4>
            <div className="space-y-2">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleFilterChange('dateRange', range.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    currentFilters.dateRange === range.value
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cities Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Cities</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {popularCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityToggle(city)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-200",
                    currentFilters.cities.includes(city)
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
