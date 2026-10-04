import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-48 items-center justify-center overflow-hidden bg-slate-50 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-block w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-indigo-700">
          {product.category}
        </span>
        <h2 className="mt-2 line-clamp-2 flex-1 text-sm font-semibold text-slate-900">
          {product.title}
        </h2>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Prix</p>
            <p className="text-lg font-bold text-slate-900">
              {product.price.toFixed(2)} €
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Note</p>
            <p className="text-sm font-medium text-amber-600">
              ⭐ {product.rating.rate.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}