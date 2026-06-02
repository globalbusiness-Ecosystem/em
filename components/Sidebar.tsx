"use client";

import { useEffect } from "react";
import {
  X,
  Home,
  Grid2x2,
  PlusSquare,
  Package,
  Wallet,
  Star,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import type { Tab } from "@/components/BottomNav";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
}

const NAV_ITEMS: { tab: Tab; label: string; Icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }> }[] = [
  { tab: "home",   label: "Home",     Icon: Home        },
  { tab: "browse", label: "Browse",   Icon: Grid2x2     },
  { tab: "sell",   label: "Sell",     Icon: PlusSquare  },
  { tab: "orders", label: "Orders",   Icon: Package     },
  { tab: "wallet", label: "Wallet",   Icon: Wallet      },
];

export function Sidebar({ open, onClose, activeTab, onNavigate }: SidebarProps) {
  const { userData } = usePiAuth();

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed top-0 left-0 z-50 h-full flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: 280,
          backgroundColor: "var(--color-background)",
          borderRight: "1px solid var(--color-border)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-0">
              <span
                className="text-[20px] font-black leading-none tracking-tight"
                style={{ color: "#ff5c00", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                em
              </span>
              <span
                className="text-[20px] font-black leading-none tracking-tight"
                style={{ color: "var(--color-foreground)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                .
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
              em.pi
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Close menu"
          >
            <X size={17} className="text-foreground" />
          </button>
        </div>

        {/* User profile strip */}
        {userData && (
          <div
            className="flex items-center gap-3 px-5 py-4 border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#fff0e8" }}
            >
              <User size={18} color="#ff5c00" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-foreground truncate">
                {userData.username}
              </span>
              <span className="text-[11px] text-muted-foreground">Pi Network member</span>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ tab, label, Icon }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { onNavigate(tab); onClose(); }}
                className="flex items-center gap-3 px-3 py-3 rounded-2xl text-left w-full transition-colors"
                style={{
                  backgroundColor: isActive ? "#fff0e8" : "transparent",
                  color: isActive ? "#ff5c00" : "var(--color-foreground)",
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? "" : "text-muted-foreground"}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: isActive ? "#ff5c00" : "var(--color-foreground)" }}
                >
                  {label}
                </span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-5 rounded-full"
                    style={{ backgroundColor: "#ff5c00" }}
                  />
                )}
              </button>
            );
          })}

          <div
            className="my-2 border-t"
            style={{ borderColor: "var(--color-border)" }}
          />

          <button className="flex items-center gap-3 px-3 py-3 rounded-2xl text-left w-full transition-colors hover:bg-secondary">
            <Star size={18} strokeWidth={1.8} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Wishlist</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-3 rounded-2xl text-left w-full transition-colors hover:bg-secondary">
            <HelpCircle size={18} strokeWidth={1.8} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Help &amp; Support</span>
          </button>
        </nav>

        {/* Footer */}
        <div
          className="px-3 py-4 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <button className="flex items-center gap-3 px-3 py-3 rounded-2xl text-left w-full transition-colors hover:bg-secondary">
            <LogOut size={18} strokeWidth={1.8} color="#dc2626" />
            <span className="text-sm font-semibold" style={{ color: "#dc2626" }}>
              Sign Out
            </span>
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-3">
            em.pi · Everything Market on Pi Network
          </p>
        </div>
      </aside>
    </>
  );
}
