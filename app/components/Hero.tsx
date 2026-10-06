import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-violet-50/50 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60">
   
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-12 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">


          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Solutions to Elevate Your{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Business Growth
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
            Unlock potential with tailored strategies designed for success. Simplify challenges, maximize results, and stay ahead in the competitive market.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link
              href="#"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-violet-600 transition-all duration-300 shadow-md hover:shadow-violet-500/25 active:scale-95"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-800 font-semibold text-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm active:scale-95"
            >
              <span>View Shopping Cart</span>
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
}
