"use client";

import { useMemo } from "react";
import { useProductStore } from "@/lib/store";

export function CategoryFilter() {
  const products = useProductStore((s) => s.products);
  const category = useProductStore((s) => s.category);
  const setCategory = useProductStore((s) => s.setCategory);
  const status = useProductStore((s) => s.status);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      disabled={status !== "success"}
      aria-label="Filtrer par catégorie"
      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat === "all" ? "Toutes les catégories" : cat}
        </option>
      ))}
    </select>
  );
}