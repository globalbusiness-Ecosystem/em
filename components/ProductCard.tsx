"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import Image from "next/image";
import { EmPayButton } from "@/components/EmPayButton";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  category: string;
  badge?: "hot" | "new" | "sale";
  freeShipping?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  layout?: "grid" | "list";
}

function DiscountBadge({ original, current }: { original: number; current: number }) {
  const pct = Math.round(((original - current) / original) * 100);
  if (pct <= 0) return null;
  return (
    <span
      className="text-white text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none"
      style={{ backgroundColor: "#ff5c00" }}
    >
      -{pct}%
    </span>
  );
}

export function ProductCard({ product, onAddToCart, layout = "grid" }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 700);
  };

  /* ── List layout ─────────────────────────────────────── */
  if (layout === "list") {
    return (
      <article className="flex gap-3 bg-card rounded-2xl p-3 border border-border">
        {/* Image */}
        <div className="relative w-[88px] h-[88px] shrink-0 rounded-xl overflow-hidden bg-secondary">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="88px" />
          {product.originalPrice && (
            <div className="absolute top-1.5 left-1.5">
              <DiscountBadge original={product.originalPrice} current={product.price} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
          <div>
            <p className="text-[10px] text-muted-foreground truncate">{product.seller}</p>
            <h3 className="text-sm font-semibold text-foreground leading-snug mt-0.5 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Star size={10} fill="#ff5c00" color="#ff5c00" />
              <span className="text-[10px] text-muted-foreground">{product.rating}</span>
              <span className="text-[10px] text-muted-foreground">({product.reviews.toLocaleString()})</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-foreground">{product.price} π</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{product.originalPrice} π</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold transition-all active:scale-95"
                style={{ backgroundColor: justAdded ? "#16a34a" : "#ff5c00" }}
                aria-label={`Add ${product.name} to cart`}
              >
                {justAdded ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart size={11} />
                    Add
                  </>
                )}
              </button>
              <EmPayButton variant="compact" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  /* ── Grid layout ─────────────────────────────────────── */
  return (
    <article className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
      {/* Image area */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 50vw, 200px"
        />

        {/* Top-left badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.originalPrice && (
            <DiscountBadge original={product.originalPrice} current={product.price} />
          )}
          {product.badge === "new" && (
            <span className="text-white text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none bg-foreground">
              NEW
            </span>
          )}
          {product.badge === "hot" && (
            <span className="text-white text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none bg-red-500">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm transition-transform active:scale-90"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={13}
            fill={wishlisted ? "#ff5c00" : "none"}
            color={wishlisted ? "#ff5c00" : "#888888"}
            strokeWidth={1.8}
          />
        </button>

        {/* Free shipping strip */}
        {product.freeShipping && (
          <div className="absolute bottom-0 inset-x-0 bg-green-500/90 py-0.5 flex items-center justify-center gap-1">
            <Truck size={9} color="white" />
            <span className="text-white text-[8px] font-bold">FREE SHIPPING</span>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <p className="text-[10px] text-muted-foreground truncate">{product.seller}</p>
        <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2 flex-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-0.5">
          <Star size={9} fill="#ff5c00" color="#ff5c00" />
          <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-end justify-between mt-0.5">
          <div>
            <div className="text-sm font-black text-foreground leading-none">{product.price} π</div>
            {product.originalPrice && (
              <div className="text-[10px] text-muted-foreground line-through mt-0.5">
                {product.originalPrice} π
              </div>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all active:scale-90"
            style={{ backgroundColor: justAdded ? "#16a34a" : "#ff5c00" }}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <ShoppingCart size={14} />
            )}
          </button>
        </div>
        <EmPayButton variant="compact" className="mt-1 w-full [&>button]:w-full [&>button]:justify-center" />
      </div>
    </article>
  );
}
