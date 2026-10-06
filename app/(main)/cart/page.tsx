"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import useCartStore from "@/app/store/cart";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Calculations
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(String(item.price)) || 0;
    const qty = item.quantity || 1;
    return total + price * qty;
  }, 0);

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const estimatedTax = (subtotal - discount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discount + shipping + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SAVE10" || promoCode.trim().length > 2) {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    const newId = `#LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Thank you for your order!
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your order has been placed successfully and is being processed. We&apos;ve sent a confirmation email with all details.
        </p>
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 mb-8 text-left space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Order Number</span>
            <span className="font-mono font-bold text-slate-800">{orderId || "#LUM-839201"}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Estimated Delivery</span>
            <span className="font-semibold text-slate-800">2-4 Business Days</span>
          </div>
        </div>
        <Link
          href="featured-products"
          onClick={() => setOrderComplete(false)}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition shadow-md"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200/80 p-10 text-center shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Looks like you haven&apos;t added any items to your shopping cart yet. Discover our collection and find something you love.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-violet-600 transition shadow-sm active:scale-95"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/80 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected items and proceed to secure checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 self-start sm:self-auto hover:underline"
        >
          Clear entire cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => {
            const price = parseFloat(String(item.price)) || 0;
            const quantity = item.quantity || 1;
            const lineTotal = (price * quantity).toFixed(2);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all gap-4"
              >
                {/* Thumbnail & Details */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || item.name || "Product"}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div>
                    {item.category && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 mb-0.5 inline-block">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                      {item.title || item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ${price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity pill */}
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-slate-600 hover:text-slate-900 hover:scale-110 transition p-0.5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-slate-600 hover:text-slate-900 hover:scale-110 transition p-0.5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-base font-black text-slate-900">
                      ${lineTotal}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Card (Col 4) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-28 space-y-6">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo (try SAVE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 transition uppercase placeholder:normal-case"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-semibold hover:bg-violet-600 transition"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200/60">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Promo code applied! 10% discount added.</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-900">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 shadow-md shadow-violet-500/25 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}