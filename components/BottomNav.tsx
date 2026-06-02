"use client";

import { Home, Grid3X3, PlusCircle, Package, Wallet } from "lucide-react";

export type Tab = "home" | "browse" | "sell" | "orders" | "wallet";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

interface NavTab {
  id: Tab;
  label: string;
  Icon: React.FC<{ size?: number; strokeWidth?: number; color?: string }>;
  isCTA?: boolean;
}

const TABS: NavTab[] = [
  { id: "home",   label: "Home",   Icon: Home },
  { id: "browse", label: "Browse", Icon: Grid3X3 },
  { id: "sell",   label: "Sell",   Icon: PlusCircle, isCTA: true },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "wallet", label: "Wallet", Icon: Wallet },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border pb-safe"
      aria-label="Main navigation"
    >
      <div className="flex items-end justify-around px-1 pt-2 pb-1 max-w-md mx-auto">
        {TABS.map(({ id, label, Icon, isCTA }) => {
          const isActive = activeTab === id;

          if (isCTA) {
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className="flex flex-col items-center gap-1 flex-1 pb-0.5"
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg -mt-4 transition-transform active:scale-90"
                  style={{
                    backgroundColor: "#ff5c00",
                    boxShadow: "0 4px 16px rgba(255,92,0,0.4)",
                  }}
                >
                  <Icon size={22} strokeWidth={2} color="white" />
                </div>
                <span
                  className="text-[10px] font-semibold leading-none"
                  style={{ color: isActive ? "#ff5c00" : "#999999" }}
                >
                  {label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center gap-1 flex-1 py-0.5 transition-opacity active:opacity-60"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: isActive ? "#fff0e8" : "transparent" }}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isActive ? "#ff5c00" : "#999999"}
                />
              </div>
              <span
                className="text-[10px] font-semibold leading-none"
                style={{ color: isActive ? "#ff5c00" : "#999999" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
