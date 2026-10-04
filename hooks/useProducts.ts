"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/types";

type Status = "idle" | "loading" | "success" | "error";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");

      if (!res.ok) {
        throw new Error(`L'API a répondu avec le code ${res.status}.`);
      }

      const json = await res.json();

      const mappedProducts: Product[] = json.products.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.thumbnail,
        rating: {
          rate: item.rating || 0, // DummyJSON renvoie un nombre ici
          count: 0,
        },
      }));

      setProducts(mappedProducts);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible de contacter l'API. Vérifiez votre connexion."
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, status, error, retry: fetchProducts };
}