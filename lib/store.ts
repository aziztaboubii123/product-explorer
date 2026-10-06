import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Product } from "./types";

type Status = "idle" | "loading" | "success" | "error";

type ProductState = {
  // 📦 Data
  products: Product[];
  status: Status;
  error: string | null;

  // 🔍 Filters
  query: string;
  category: string;

  // ⚡ Actions
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  fetchProducts: () => Promise<void>;
};

export const useProductStore = create<ProductState>()(
  devtools(
    (set) => ({
      products: [],
      status: "idle",
      error: null,
      query: "",
      category: "all",

      setQuery: (query) => set({ query }, false, "setQuery"),
      setCategory: (category) => set({ category }, false, "setCategory"),

      fetchProducts: async () => {
        set({ status: "loading", error: null }, false, "fetchProducts/start");

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
            rating: { rate: item.rating || 0, count: 0 },
          }));

          set(
            { products: mappedProducts, status: "success" },
            false,
            "fetchProducts/success"
          );
        } catch (err) {
          set(
            {
              error:
                err instanceof Error
                  ? err.message
                  : "Impossible de contacter l'API.",
              status: "error",
            },
            false,
            "fetchProducts/error"
          );
        }
      },
    }),
    { name: "ProductStore" }
  )
);