'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface FilterButtonProps {
  filter: string;
  filters: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  // setFilter: any;
  query: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ filter, filters, setFilter, query }) => {
  const router = useRouter();

  return (
    <div className="flex gap-4 mb-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => {
            // console.log(`Switching to filter: ${f}`);
            setFilter(f);
            router.push(`/search?q=${encodeURIComponent(query)}&type=${f}`);
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
            filter === f
              ? 'bg-orange-500 text-white'
              : 'bg-[#2a2a2a] text-white/80 hover:bg-[#3a3a3a]'
          }`}
          aria-current={filter === f ? 'true' : undefined}
        >
          {f}
        </button>
      ))}
    </div>
  );
};