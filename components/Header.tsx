"use client";

import { useState } from "react";
import { Menu, Settings, ShoppingCart, Search, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { SettingsPage } from "@/components/SettingsPage";
import type { Tab } from "@/components/BottomNav";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  activeTab: Tab;
  onNavigate?: (tab: Tab) => void;
}

export function Header({ cartCount, onCartOpen, activeTab, onNavigate }: HeaderProps) {
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-border"
        style={{ backgroundColor: "var(--color-background, #f5f3ef)" }}
      >
        {searchOpen ? (
          /* ── Search bar ───────────────────────────────────── */
          <div className="flex items-center gap-2 px-3 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5 border border-border">
              <Search size={15} className="shrink-0 text-muted-foreground" />
              <input
                autoFocus
                type="search"
                placeholder="Search products, brands..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              className="shrink-0 w-9 h-9 rounded-xl bg-secondary flex items-center justify-center border border-border"
              aria-label="Close search"
            >
              <X size={16} className="text-foreground" />
            </button>
          </div>
        ) : (
          /* ── Main bar ─────────────────────────────────────── */
          <div className="relative flex items-center px-2 py-2.5 h-14">

            {/* Left: hamburger + search */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={sidebarOpen}
              >
                <Menu size={20} className="text-foreground" />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Open search"
              >
                <Search size={18} className="text-foreground" />
              </button>
            </div>

            {/* Center: logo + domain (absolutely centered so it stays true-center) */}
            <div className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="flex items-baseline gap-0">
                <span
                  className="text-[22px] font-black leading-none tracking-tight"
                  style={{ color: "#ff5c00", fontFamily: "var(--font-syne, sans-serif)" }}
                >
                  em
                </span>
                <span
                  className="text-[22px] font-black leading-none tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                >
                  .
                </span>
              </div>
              <span
                className="text-[9px] font-semibold tracking-widest uppercase"
                style={{ color: "var(--color-muted-foreground, #999)" }}
              >
                em.pi
              </span>
            </div>

            {/* Right: cart + settings */}
            <div className="flex items-center gap-0.5 ml-auto">
              <button
                onClick={onCartOpen}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              >
                <ShoppingCart size={18} className="text-foreground" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full text-white text-[9px] font-black flex items-center justify-center px-1 leading-none"
                    style={{ backgroundColor: "#ff5c00" }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setSettingsOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Open settings"
                aria-expanded={settingsOpen}
              >
                <Settings size={18} className="text-foreground" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sidebar overlay */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onNavigate={(tab) => {
          onNavigate?.(tab);
          setSidebarOpen(false);
        }}
      />

      {/* Settings sheet */}
      <SettingsPage
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
