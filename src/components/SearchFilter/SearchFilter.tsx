import React from 'react';
import { useElementStore } from '@/store/useElementStore';

export function SearchFilter() {
  const { searchQuery, setSearchQuery, activeFilters, toggleFilter, resetFilters } = useElementStore();

  const filters = [
    'Alkalis', 'Alkaline Earth', 'Transition Metal', 
    'Post-Transition', 'Metalloid', 'Nonmetal', 
    'Halogen', 'Noble Gas', 'Lanthanide', 'Actinide'
  ];

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex gap-2 items-center">
        <input 
          type="text" 
          placeholder="Search element by name, symbol, or number..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={resetFilters} className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded">
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map(f => {
          let filterKey = f.toLowerCase();
          if (filterKey === 'alkalis') filterKey = 'alkali metal';
          if (filterKey === 'alkaline earth') filterKey = 'alkaline earth metal';
          
          const isActive = activeFilters.includes(filterKey);
          return (
            <button 
              key={f}
              onClick={() => toggleFilter(filterKey)}
              className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                isActive 
                  ? 'bg-blue-500 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>
    </div>
  );
}
