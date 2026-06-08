'use client';
import { useState } from 'react';

type HubSearchProps = {
  placeholder: string;
};

export function HubSearch({ placeholder }: HubSearchProps) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      // Scroll and focus first matching tool card (future enhancement)
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl border-0 bg-white px-5 py-3 text-base text-[--gray-700] shadow-md placeholder:text-[--gray-400] focus:outline-none focus:ring-2 focus:ring-white/50"
      />
    </div>
  );
}
