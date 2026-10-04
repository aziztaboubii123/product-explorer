"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  disabled?: boolean;
};

export function CategoryFilter({ value, onChange, categories, disabled }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
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