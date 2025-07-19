import React from "react";

interface SearchFilterBarProps {
  filters: string[];
  selected: string;
  onChange: (filter: string) => void;
  onSearch: (query: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ filters, selected, onChange, onSearch }) => {
  const [query, setQuery] = React.useState("");
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search NGOs by name, location, or specialization..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch(query)}
        aria-label="Search NGOs"
      />
      <div className="flex gap-2">
        {filters.map(filter => (
          <button
            key={filter}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${selected === filter ? 'bg-gradient-to-r from-gradientFrom to-gradientTo text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-100'}`}
            onClick={() => onChange(filter)}
            aria-pressed={selected === filter}
            aria-label={`Filter: ${filter}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterBar; 