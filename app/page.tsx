"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { BottomNav, type Tab } from "@/components/BottomNav";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FlashDeals } from "@/components/FlashDeals";
import { ProductCard, type Product } from "@/components/ProductCard";
import { SellForm } from "@/components/SellForm";
import { Orders } from "@/components/Orders";
import { Wallet } from "@/components/Wallet";
import { Modal } from "@/components/Modal";
import {
  ShoppingCart,
  Trash2,
  MapPin,
  ChevronRight,
  Flame,
  TrendingUp,
  Tag,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import { EmPayButton } from "@/components/EmPayButton";

// ─── Mock product data ────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 12.5,
    originalPrice: 18.0,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    seller: "TechZone Store",
    category: "electronics",
    badge: "hot",
    freeShipping: true,
  },
  {
    id: "p2",
    name: "Adidas Ultraboost 22 Running Shoes Men",
    price: 8.2,
    originalPrice: 11.5,
    rating: 4.6,
    reviews: 887,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    seller: "SportsHub",
    category: "sports",
    badge: "sale",
  },
  {
    id: "p3",
    name: "Portable Blender Mini Personal Juicer USB",
    price: 2.8,
    originalPrice: 4.5,
    rating: 4.3,
    reviews: 1209,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
    seller: "HomeGoods Co",
    category: "home",
    freeShipping: true,
  },
  {
    id: "p4",
    name: "Organic Matcha Green Tea Premium 100g",
    price: 1.2,
    originalPrice: 2.0,
    rating: 4.7,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    seller: "NaturalFoods",
    category: "food",
    badge: "new",
  },
  {
    id: "p5",
    name: "Samsung Galaxy Tab A8 10.5 inch 64GB",
    price: 18.9,
    originalPrice: 24.0,
    rating: 4.5,
    reviews: 672,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    seller: "GadgetWorld",
    category: "electronics",
    freeShipping: true,
  },
  {
    id: "p6",
    name: "Men Classic Leather Belt Brown Genuine",
    price: 1.5,
    originalPrice: 2.8,
    rating: 4.2,
    reviews: 321,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    seller: "FashionFirst",
    category: "fashion",
    badge: "new",
  },
  {
    id: "p7",
    name: "Adjustable Dumbbell Set 5–25 kg Home Gym",
    price: 9.5,
    originalPrice: 13.0,
    rating: 4.9,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    seller: "FitEquip",
    category: "sports",
    freeShipping: true,
  },
  {
    id: "p8",
    name: "Car Dash Cam 4K WiFi GPS Night Vision",
    price: 5.6,
    originalPrice: 8.0,
    rating: 4.4,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    seller: "AutoParts Pro",
    category: "auto",
    badge: "sale",
  },
  {
    id: "p9",
    name: "The Art of War — Sun Tzu Hardcover Edition",
    price: 0.8,
    originalPrice: 1.5,
    rating: 4.9,
    reviews: 3201,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    seller: "BookNest",
    category: "books",
  },
  {
    id: "p10",
    name: "Mechanical Gaming Keyboard RGB Backlit",
    price: 7.2,
    originalPrice: 10.5,
    rating: 4.6,
    reviews: 1102,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    seller: "GamersHub",
    category: "gaming",
    badge: "hot",
    freeShipping: true,
  },
  {
    id: "p11",
    name: "Wireless Earbuds TWS Bluetooth 5.3 IPX5",
    price: 3.4,
    originalPrice: 5.5,
    rating: 4.3,
    reviews: 2789,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    seller: "AudioPlus",
    category: "electronics",
  },
  {
    id: "p12",
    name: "Women Floral Summer Dress Bohemian Style",
    price: 2.2,
    originalPrice: 4.0,
    rating: 4.5,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    seller: "StyleBox",
    category: "fashion",
    badge: "sale",
  },
];

// ─── Cart types ───────────────────────────────────────────────────────────────

interface CartItem {
  product: Product;
  qty: number;
}

// ─── Hero Banner ──────────────────────────────────────────────────────────────

function HeroBanner({ onShopNow }: { onShopNow: () => void }) {
  return (
    <div
      className="mx-4 rounded-3xl overflow-hidden relative"
      style={{ backgroundColor: "#111111", minHeight: 188 }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
        style={{ backgroundColor: "#ff5c00" }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
        style={{ backgroundColor: "#ff5c00" }}
      />

      <div className="relative flex items-center justify-between px-5 py-7">
        {/* Text */}
        <div className="flex-1 pr-3 z-10">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold mb-3"
            style={{ backgroundColor: "#ff5c00", color: "white" }}
          >
            <Flame size={9} />
            Everything Market
          </div>
          <h1
            className="text-white text-[26px] font-black leading-tight text-balance mb-2"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Buy &amp; Sell with{" "}
            <span style={{ color: "#ff5c00" }}>Pi</span>
          </h1>
          <p className="text-white/50 text-xs mb-4 leading-relaxed">
            Millions of products worldwide.
            <br />
            Pay with Pi cryptocurrency.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onShopNow}
              className="px-5 py-2.5 rounded-xl text-xs font-black text-white transition-transform active:scale-95"
              style={{ backgroundColor: "#ff5c00" }}
            >
              Shop Now
            </button>
            <EmPayButton variant="primary" />
          </div>
        </div>

        {/* Bouncing Pi orb */}
        <div className="animate-em-bounce shrink-0 z-10">
          <div
            className="w-[88px] h-[88px] rounded-3xl flex items-center justify-center text-[44px] font-black text-white"
            style={{
              backgroundColor: "#ff5c00",
              fontFamily: "var(--font-syne, sans-serif)",
              boxShadow: "0 16px 40px rgba(255,92,0,0.45)",
            }}
          >
            π
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cart sheet ───────────────────────────────────────────────────────────────

function CartSheet({
  cart,
  onUpdateQty,
  onRemove,
  onCheckout,
}: {
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 px-8">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#fff0e8" }}
        >
          <ShoppingCart size={32} color="#ff5c00" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-foreground">Cart is empty</p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Browse products and add items to your cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {cart.map(({ product, qty }) => (
          <div
            key={product.id}
            className="flex gap-3 bg-secondary rounded-2xl p-3"
          >
            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-card">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                {product.name}
              </p>
              <p className="text-sm font-black text-foreground mt-1">
                {product.price} π
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => onUpdateQty(product.id, qty - 1)}
                    className="w-8 h-8 flex items-center justify-center text-foreground font-bold text-base transition-colors hover:bg-secondary"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-xs font-bold text-foreground w-6 text-center tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(product.id, qty + 1)}
                    className="w-8 h-8 flex items-center justify-center text-foreground font-bold text-base transition-colors hover:bg-secondary"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemove(product.id)}
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: "#fef2f2" }}
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 size={14} color="#dc2626" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 pt-3 pb-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
          </span>
          <span className="text-xl font-black text-foreground tabular-nums">
            {total.toFixed(3)} π
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{ backgroundColor: "#ff5c00" }}
        >
          Pay with Pi
          <span className="text-[22px] font-black leading-none">π</span>
        </button>
      </div>
    </div>
  );
}

// ─── Browse tab ───────────────────────────────────────────────────────────────

function BrowseTab({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc" | "rating">(
    "default"
  );

  let filtered = products.filter((p) => {
    const matchCat = selectedCategory ? p.category === selectedCategory : true;
    const matchQ = query
      ? p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.seller.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchCat && matchQ;
  });

  if (sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl px-4 py-3 border border-border">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-10 h-full rounded-2xl bg-secondary border border-border text-transparent outline-none cursor-pointer appearance-none"
            aria-label="Sort products"
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SlidersHorizontal size={16} className="text-foreground" />
          </div>
        </div>
      </div>

      {/* Category filter */}
      <CategoryGrid
        onSelect={(id) => setSelectedCategory((c) => (c === id ? null : id))}
        selected={selectedCategory}
        showTitle={false}
      />

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: "#fff0e8", color: "#ff5c00" }}
          >
            Clear filter
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
            <Search size={26} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-muted-foreground">
            No results for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Home tab ─────────────────────────────────────────────────────────────────

function HomeTab({
  products,
  onAddToCart,
  onBrowse,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onBrowse: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featured = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col gap-5 py-4 pb-4">
      {/* Hero */}
      <HeroBanner onShopNow={onBrowse} />

      {/* Delivery strip */}
      <div className="flex items-center gap-2 px-4">
        <MapPin size={13} color="#ff5c00" />
        <span className="text-xs text-muted-foreground">Delivering worldwide</span>
        <button
          className="ml-auto flex items-center gap-0.5 text-xs font-semibold"
          style={{ color: "#ff5c00" }}
        >
          Change <ChevronRight size={11} />
        </button>
      </div>

      {/* Flash deals */}
      <FlashDeals products={products} onAddToCart={onAddToCart} />

      {/* Categories */}
      <CategoryGrid
        onSelect={(id) => setSelectedCategory((c) => (c === id ? null : id))}
        selected={selectedCategory}
      />

      {/* Trending */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} color="#ff5c00" />
            <h2
              className="text-[15px] font-bold text-foreground"
              style={{ fontFamily: "var(--font-syne, sans-serif)" }}
            >
              {selectedCategory
                ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                : "Trending Now"}
            </h2>
          </div>
          <button
            onClick={onBrowse}
            className="text-xs font-semibold"
            style={{ color: "#ff5c00" }}
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} layout="grid" />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <div
        className="mx-4 rounded-3xl p-5 flex items-center justify-between"
        style={{ backgroundColor: "#fff0e8" }}
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Tag size={13} color="#ff5c00" />
            <span className="text-[11px] font-bold" style={{ color: "#ff5c00" }}>
              Special offer
            </span>
          </div>
          <p
            className="text-[15px] font-black text-foreground leading-tight text-balance"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            First purchase?
            <br />
            Get 10% off
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Code: <span className="font-bold">PIMARKET</span>
          </p>
        </div>
        <button
          onClick={onBrowse}
          className="px-4 py-2.5 rounded-xl text-white font-bold text-xs shrink-0 transition-transform active:scale-95"
          style={{ backgroundColor: "#ff5c00" }}
        >
          Shop Now
        </button>
      </div>

      {/* All products list */}
      <section className="px-4">
        <h2
          className="text-[15px] font-bold text-foreground mb-3"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          All Products
        </h2>
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} layout="list" />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Root page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
      );
    }
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const handleCheckout = () => {
    const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
    if (typeof window !== "undefined" && typeof window.pay === "function") {
      window.pay({
        amount: parseFloat(total.toFixed(3)),
        memo: `em. marketplace — ${cartCount} item(s)`,
        metadata: { cartItems: cart.map((i) => ({ id: i.product.id, qty: i.qty })) },
        onComplete: () => {
          setCart([]);
          setCartOpen(false);
          setCheckoutDone(true);
          setTimeout(() => setCheckoutDone(false), 4000);
        },
        onError: (err) => console.error("Payment error:", err),
      });
    } else {
      // Preview fallback
      setCart([]);
      setCartOpen(false);
      setCheckoutDone(true);
      setTimeout(() => setCheckoutDone(false), 4000);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab
            products={ALL_PRODUCTS}
            onAddToCart={addToCart}
            onBrowse={() => setActiveTab("browse")}
          />
        );
      case "browse":
        return <BrowseTab products={ALL_PRODUCTS} onAddToCart={addToCart} />;
      case "sell":
        return <SellForm />;
      case "orders":
        return <Orders />;
      case "wallet":
        return <Wallet />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col max-w-md mx-auto relative">
      {/* Success toast */}
      {checkoutDone && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-2xl text-white text-sm font-bold shadow-xl flex items-center gap-2 animate-slide-up whitespace-nowrap"
          style={{ backgroundColor: "#16a34a" }}
          role="status"
          aria-live="polite"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.25" />
            <path
              d="M4.5 8.5l2.5 2.5 4.5-5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Order placed successfully!
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        activeTab={activeTab}
        onNavigate={setActiveTab}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-24" id="main-content">
        {renderTab()}
      </main>

      {/* Bottom nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Cart modal */}
      <Modal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        title={`Cart${cartCount > 0 ? ` (${cartCount})` : ""}`}
      >
        <CartSheet
          cart={cart}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      </Modal>
    </div>
  );
}
