"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowUpDown } from "lucide-react";
import Card, { Product } from "./Card";

interface ProductCatalogProps {
  initialProducts: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductCatalog({
  initialProducts,
  title = "Curated Products",
  subtitle = "Explore our handpicked collection of premium products crafted for quality and style.",
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.category) {
        cats.add(p.category);
      }
    });
    return ["all", ...Array.from(cats)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const titleMatch = (product.title || product.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const descMatch = (product.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const categoryMatch =
          selectedCategory === "all" ||
          (product.category &&
            product.category.toLowerCase() === selectedCategory.toLowerCase());

        return (titleMatch || descMatch) && categoryMatch;
      })
      .sort((a, b) => {
        const priceA = parseFloat(String(a.price)) || 0;
        const priceB = parseFloat(String(b.price)) || 0;
        const ratingA = a.rating?.stars || 0;
        const ratingB = b.rating?.stars || 0;

        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "rating") return ratingB - ratingA;
        return 0;
      });
  }, [initialProducts, searchQuery, selectedCategory, sortBy]);

  return (
    <section id="#featured-products" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
            {subtitle}
          </p>
        </div>


      </div>


      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">

          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by title, category, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>


          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition cursor-pointer"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">No products found</h3>
          <p className="text-sm text-slate-500 mb-6">
            We couldn&apos;t find any items matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try clearing filters or searching for something else.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortBy("featured");
            }}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-violet-600 transition shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}
