"use client";

import { useEffect, useState } from "react";
import { Zap, ShoppingCart } from "lucide-react";
import Image from "next/image";
import type { Product } from "./ProductCard";

interface FlashDealsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function useCountdown(targetSeconds: number) {
  const [seconds, setSeconds] = useState(targetSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : targetSeconds));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetSeconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-black tabular-nums"
        style={{ backgroundColor: "#111111" }}
      >
        {value}
      </div>
      <span className="text-[8px] text-white/60 mt-0.5 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

export function FlashDeals({ products, onAddToCart }: FlashDealsProps) {
  const { h, m, s } = useCountdown(4 * 3600 + 23 * 60 + 47);

  // Only show products that have a discounted price
  const flashProducts = products
    .filter((p) => p.originalPrice && p.originalPrice > p.price)
    .slice(0, 8);

  const getDiscountPct = (p: Product) => {
    if (!p.originalPrice || p.originalPrice <= p.price) return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  };

  return (
    <section aria-label="Flash Deals">
      {/* Header bar */}
      <div
        className="mx-4 rounded-2xl px-4 py-3 mb-3"
        style={{ backgroundColor: "#ff5c00" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-ring shrink-0">
              <Zap size={17} fill="white" color="white" />
            </div>
            <div>
              <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider">
                Limited time
              </p>
              <h2
                className="text-white text-lg font-black leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                Flash Deals
              </h2>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-1.5">
            <TimeBlock value={h} label="hr" />
            <span className="text-white font-black text-sm pb-4 leading-none">:</span>
            <TimeBlock value={m} label="min" />
            <span className="text-white font-black text-sm pb-4 leading-none">:</span>
            <TimeBlock value={s} label="sec" />
          </div>
        </div>
      </div>

      {/* Product scroll */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {flashProducts.map((product) => {
          const pct = getDiscountPct(product);
          return (
            <div
              key={product.id}
              className="shrink-0 w-36 bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative w-full aspect-square bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
                {pct > 0 && (
                  <span
                    className="absolute top-1.5 left-1.5 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none"
                    style={{ backgroundColor: "#ff5c00" }}
                  >
                    -{pct}%
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                  {product.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-sm font-black text-foreground leading-none">
                      {product.price} π
                    </p>
                    {product.originalPrice && (
                      <p className="text-[10px] text-muted-foreground line-through mt-0.5">
                        {product.originalPrice} π
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white transition-transform active:scale-90"
                    style={{ backgroundColor: "#ff5c00" }}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
