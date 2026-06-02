"use client";

import Image from "next/image";
import {
  Smartphone,
  Shirt,
  Home,
  Utensils,
  Dumbbell,
  Car,
  BookOpen,
  Gamepad2,
} from "lucide-react";

export interface Category {
  id: string;
  label: string;
  Icon: React.FC<{ size?: number; color?: string; strokeWidth?: number }>;
  iconColor: string;
  bgColor: string;
  thumbnail?: string;
}

export const CATEGORIES: Category[] = [
  { id: "electronics", label: "Electronics", Icon: Smartphone, iconColor: "#2563eb", bgColor: "#eff6ff", thumbnail: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200" },
  { id: "fashion",     label: "Fashion",     Icon: Shirt,      iconColor: "#db2777", bgColor: "#fdf2f8", thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200" },
  { id: "home",        label: "Home",        Icon: Home,       iconColor: "#16a34a", bgColor: "#f0fdf4", thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200" },
  { id: "food",        label: "Food",        Icon: Utensils,   iconColor: "#ea580c", bgColor: "#fff7ed", thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200" },
  { id: "sports",      label: "Sports",      Icon: Dumbbell,   iconColor: "#7c3aed", bgColor: "#f5f3ff", thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200" },
  { id: "auto",        label: "Autos",       Icon: Car,        iconColor: "#0891b2", bgColor: "#ecfeff" },
  { id: "books",       label: "Books",       Icon: BookOpen,   iconColor: "#b45309", bgColor: "#fffbeb" },
  { id: "gaming",      label: "Gaming",      Icon: Gamepad2,   iconColor: "#dc2626", bgColor: "#fef2f2" },
];

interface CategoryGridProps {
  onSelect: (id: string) => void;
  selected?: string | null;
  showTitle?: boolean;
}

export function CategoryGrid({ onSelect, selected, showTitle = true }: CategoryGridProps) {
  return (
    <section aria-label="Product categories">
      {showTitle && (
        <div className="flex items-center justify-between mb-3 px-4">
          <h2
            className="text-[15px] font-bold text-foreground"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Categories
          </h2>
          <button
            className="text-xs font-semibold"
            style={{ color: "#ff5c00" }}
          >
            See all
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-y-4 gap-x-3 px-4">
        {CATEGORIES.map(({ id, label, Icon, iconColor, bgColor, thumbnail }) => {
          const isActive = selected === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="flex flex-col items-center gap-1.5 transition-transform active:scale-90"
              aria-label={label}
              aria-pressed={isActive}
            >
              <div
                className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center transition-all relative"
                style={{
                  backgroundColor: isActive ? iconColor : bgColor,
                  outline: isActive ? `2px solid ${iconColor}` : "2px solid transparent",
                  outlineOffset: "1px",
                }}
              >
                {thumbnail ? (
                  <>
                    <Image
                      src={thumbnail}
                      alt={label}
                      fill
                      className="object-cover"
                      sizes="56px"
                      style={{ opacity: isActive ? 0.7 : 1 }}
                    />
                    {isActive && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: `${iconColor}99` }}
                      >
                        <Icon size={22} color="#ffffff" strokeWidth={1.8} />
                      </div>
                    )}
                  </>
                ) : (
                  <Icon
                    size={24}
                    color={isActive ? "#ffffff" : iconColor}
                    strokeWidth={1.8}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-semibold text-center leading-tight"
                style={{ color: isActive ? iconColor : "var(--color-foreground)" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
