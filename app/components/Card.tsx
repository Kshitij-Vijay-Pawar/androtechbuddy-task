"use client";

import { useState } from "react";
import { Star, ShoppingBag, Check, Heart } from "lucide-react";
import useCartStore, { CartItem } from "../store/cart";

export type Product = CartItem;

const Card = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const stars = product.rating?.stars ?? 4.5;
  const reviewCount = product.rating?.count ?? 28;
  const formattedPrice = typeof product.price === "number" ? product.price.toFixed(2) : product.price;

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm hover:shadow-xl hover:border-violet-200 hover:-translate-y-1.5 transition-all duration-300">
      
      <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-2xl overflow-hidden flex items-center justify-center p-6 mb-4">




        {product.image ? (
          <img
            src={product.image}
            alt={product.title || product.name || "Product"}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <ShoppingBag className="w-10 h-10 stroke-1 mb-1" />
            <span className="text-xs">No image preview</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-700">{stars}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">({reviewCount} reviews)</span>
          </div>

          <h2 className="text-base font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-violet-600 transition-colors">
            {product.title || product.name}
          </h2>

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Price</span>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              ${formattedPrice}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs transition-all duration-300 shadow-sm active:scale-95 ${
              isAdded
                ? "bg-emerald-500 text-white shadow-emerald-500/25"
                : "bg-slate-900 text-white hover:bg-violet-600 hover:shadow-violet-500/25"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;