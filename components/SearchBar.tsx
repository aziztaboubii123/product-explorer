"use client";

import { useProductStore } from "@/lib/store";

export function SearchBar() {
  const query = useProductStore((s) => s.query);
  const setQuery = useProductStore((s) => s.setQuery);

  return (
    <div className="relative flex-1">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="m20 20-3.5-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit..."
        aria-label="Rechercher un produit"
        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}