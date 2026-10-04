"use client";

import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StatusState";

export default function Home() {
  const { products, status, error, retry } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = q === "" || product.title.toLowerCase().includes(q);
      const matchesCategory = category === "all" || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Product Explorer
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Consommation d'API en direct — recherche, filtre par catégorie, et
          gestion des erreurs.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter
          value={category}
          onChange={setCategory}
          categories={categories}
          disabled={status !== "success"}
        />
      </div>

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState message={error} onRetry={retry} />}
      {status === "success" && filtered.length === 0 && (
        <EmptyState query={query} />
      )}
      {status === "success" && filtered.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} affiché
            {filtered.length > 1 ? "s" : ""}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}