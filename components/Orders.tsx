"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronRight,
  Star,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  item: string;
  image: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  seller: string;
  date: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "EM-001924",
    item: "Sony WH-1000XM5 Wireless Headphones",
    image: "/placeholder.svg?height=80&width=80",
    price: 12.5,
    quantity: 1,
    status: "shipped",
    seller: "TechZone Store",
    date: "Mar 2, 2026",
    estimatedDelivery: "Mar 8, 2026",
    trackingNumber: "PI789456123",
  },
  {
    id: "EM-001855",
    item: "Adidas Ultraboost 22 Running Shoes",
    image: "/placeholder.svg?height=80&width=80",
    price: 8.2,
    quantity: 1,
    status: "delivered",
    seller: "SportsHub",
    date: "Feb 25, 2026",
  },
  {
    id: "EM-001788",
    item: "Portable Blender Mini Personal Juicer",
    image: "/placeholder.svg?height=80&width=80",
    price: 2.8,
    quantity: 2,
    status: "processing",
    seller: "HomeGoods Co",
    date: "Mar 3, 2026",
    estimatedDelivery: "Mar 10, 2026",
  },
  {
    id: "EM-001710",
    item: "Organic Matcha Green Tea Premium 100g",
    image: "/placeholder.svg?height=80&width=80",
    price: 1.2,
    quantity: 3,
    status: "pending",
    seller: "NaturalFoods",
    date: "Mar 5, 2026",
  },
];

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    bg: string;
    Icon: React.FC<{ size?: number; color?: string; strokeWidth?: number }>;
  }
> = {
  pending: { label: "Pending", color: "#b45309", bg: "#fffbeb", Icon: Clock },
  processing: { label: "Processing", color: "#2563eb", bg: "#eff6ff", Icon: Package },
  shipped: { label: "Shipped", color: "#7c3aed", bg: "#f5f3ff", Icon: Truck },
  delivered: { label: "Delivered", color: "#16a34a", bg: "#f0fdf4", Icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#fef2f2", Icon: RotateCcw },
};

const STEPS: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

const STATUS_TABS: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
];

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const config = STATUS_CONFIG[order.status];
  const StatusIcon = config.Icon;
  const currentStepIndex = STEPS.indexOf(order.status);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left"
        aria-expanded={expanded}
        aria-label={`Order ${order.id}, ${order.item}`}
      >
        <div className="flex gap-3 p-3">
          <div className="relative w-[68px] h-[68px] shrink-0 rounded-xl overflow-hidden bg-secondary">
            <Image
              src={order.image}
              alt={order.item}
              fill
              className="object-cover"
              sizes="68px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight flex-1">
                {order.item}
              </p>
              <ChevronRight
                size={15}
                className={`shrink-0 text-muted-foreground transition-transform mt-0.5 ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{order.seller}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-black text-foreground tabular-nums">
                {(order.price * order.quantity).toFixed(2)} π
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold"
                style={{ color: config.color, backgroundColor: config.bg }}
              >
                <StatusIcon size={9} color={config.color} strokeWidth={2} />
                {config.label}
              </span>
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 py-3.5 flex flex-col gap-2.5 animate-fade-in">
          {/* Details */}
          {[
            { label: "Order ID", value: order.id, mono: true },
            { label: "Date", value: order.date },
            { label: "Qty", value: `×${order.quantity}` },
            ...(order.estimatedDelivery
              ? [{ label: "Est. Delivery", value: order.estimatedDelivery, orange: true }]
              : []),
            ...(order.trackingNumber
              ? [{ label: "Tracking", value: order.trackingNumber, mono: true }]
              : []),
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{row.label}</span>
              <span
                className={`text-xs font-semibold ${row.mono ? "font-mono" : ""}`}
                style={{ color: (row as { orange?: boolean }).orange ? "#ff5c00" : "var(--color-foreground)" }}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* Shipping tracker */}
          {order.status !== "cancelled" && (
            <div className="mt-1 flex flex-col gap-0">
              {STEPS.map((step, i) => {
                const stepConf = STATUS_CONFIG[step];
                const StepIcon = stepConf.Icon;
                const isActive = i <= currentStepIndex;
                const isLast = i === STEPS.length - 1;
                return (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: isActive ? "#ff5c00" : "var(--color-secondary)",
                          border: isActive ? "none" : "2px solid var(--color-border)",
                        }}
                      >
                        <StepIcon
                          size={12}
                          color={isActive ? "white" : "#aaaaaa"}
                          strokeWidth={2}
                        />
                      </div>
                      {!isLast && (
                        <div
                          className="w-0.5 h-4 transition-colors"
                          style={{
                            backgroundColor: isActive ? "#ff5c00" : "var(--color-border)",
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="text-xs font-semibold pt-0.5"
                      style={{ color: isActive ? "#ff5c00" : "var(--color-muted-foreground)" }}
                    >
                      {stepConf.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Review CTA */}
          {order.status === "delivered" && (
            <button
              className="w-full mt-1 py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-colors active:opacity-70"
              style={{ borderColor: "#ff5c00", color: "#ff5c00" }}
            >
              <Star size={14} />
              Leave a Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function Orders() {
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");

  const filtered =
    activeTab === "all"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === activeTab);

  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
              style={{
                backgroundColor: isActive ? "#ff5c00" : "var(--color-secondary)",
                color: isActive ? "white" : "var(--color-foreground)",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Order list */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
            <Package size={26} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">No orders in this category</p>
        </div>
      )}
    </div>
  );
}
