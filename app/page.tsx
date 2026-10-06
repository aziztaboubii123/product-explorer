"use client";

import { useEffect, useMemo } from "react";
import { useProductStore } from "@/lib/store";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StatusState";

export default function Home() {
  const products = useProductStore((s) => s.products);
  const status = useProductStore((s) => s.status);
  const error = useProductStore((s) => s.error);
  const query = useProductStore((s) => s.query);
  const category = useProductStore((s) => s.category);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchQuery = q === "" || p.title.toLowerCase().includes(q);
      const matchCategory = category === "all" || p.category === category;
      return matchQuery && matchCategory;
    });
  }, [products, query, category]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Product Explorer
        </h1>
        <p className="mt-3 text-base text-slate-600">
          État global avec Zustand — recherche, filtre, et gestion des erreurs.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <SearchBar />
        <CategoryFilter />
      </div>

      {status === "loading" && <LoadingState />}
      {status === "error" && (
        <ErrorState message={error} onRetry={fetchProducts} />
      )}
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