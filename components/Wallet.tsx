"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  TrendingUp,
  Send,
  Download,
} from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";

type TxType = "receive" | "send" | "purchase";
type TxFilter = "all" | TxType;

interface Transaction {
  id: string;
  type: TxType;
  label: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  txHash?: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx1",
    type: "receive",
    label: "Sale: Sony WH-1000XM5 Headphones",
    amount: 12.5,
    date: "Mar 2",
    status: "completed",
    txHash: "a1b2c3d4e5f6",
  },
  {
    id: "tx2",
    type: "purchase",
    label: "Adidas Ultraboost 22 Running Shoes",
    amount: -8.2,
    date: "Feb 25",
    status: "completed",
    txHash: "b2c3d4e5f6a1",
  },
  {
    id: "tx3",
    type: "receive",
    label: "Sale: Organic Matcha Tea x3",
    amount: 3.6,
    date: "Feb 20",
    status: "completed",
    txHash: "c3d4e5f6a1b2",
  },
  {
    id: "tx4",
    type: "purchase",
    label: "Portable Blender Mini x2",
    amount: -5.6,
    date: "Mar 3",
    status: "pending",
  },
  {
    id: "tx5",
    type: "send",
    label: "Transfer to External Wallet",
    amount: -2.0,
    date: "Jan 28",
    status: "completed",
    txHash: "d4e5f6a1b2c3",
  },
  {
    id: "tx6",
    type: "receive",
    label: "Sale: Adjustable Dumbbell Set",
    amount: 9.5,
    date: "Jan 15",
    status: "completed",
    txHash: "e5f6a1b2c3d4",
  },
  {
    id: "tx7",
    type: "purchase",
    label: "Mechanical Keyboard RGB",
    amount: -7.2,
    date: "Jan 10",
    status: "completed",
    txHash: "f6a1b2c3d4e5",
  },
];

const TX_META: Record<
  TxType,
  { Icon: React.FC<{ size?: number; color?: string }>; color: string; bg: string }
> = {
  receive: { Icon: ArrowDownLeft, color: "#16a34a", bg: "#f0fdf4" },
  send: { Icon: ArrowUpRight, color: "#dc2626", bg: "#fef2f2" },
  purchase: { Icon: ShoppingBag, color: "#ff5c00", bg: "#fff0e8" },
};

const FILTERS: { id: TxFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "receive", label: "Received" },
  { id: "purchase", label: "Purchases" },
  { id: "send", label: "Sent" },
];

export function Wallet() {
  const { userData } = usePiAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<TxFilter>("all");

  const balance = userData?.credits_balance ?? 47.82;
  const walletAddress = "GBBM6F...PIX2026";

  const filteredTx =
    filter === "all"
      ? MOCK_TRANSACTIONS
      : MOCK_TRANSACTIONS.filter((t) => t.type === filter);

  const totalIn = MOCK_TRANSACTIONS.filter((t) => t.amount > 0).reduce(
    (s, t) => s + t.amount,
    0
  );
  const totalOut = MOCK_TRANSACTIONS.filter((t) => t.amount < 0).reduce(
    (s, t) => s + Math.abs(t.amount),
    0
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-10">
      {/* Balance card */}
      <div
        className="rounded-3xl p-5 text-white"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] text-white/50 font-medium uppercase tracking-widest">
              Pi Balance
            </p>
            <p className="text-xs text-white/40 mt-0.5 font-medium">
              {userData?.username ?? "Pioneer"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBalanceVisible((v) => !v)}
              className="p-2 rounded-xl bg-white/10 active:bg-white/20 transition-colors"
              aria-label={balanceVisible ? "Hide balance" : "Show balance"}
            >
              {balanceVisible ? (
                <EyeOff size={15} color="white" />
              ) : (
                <Eye size={15} color="white" />
              )}
            </button>
            <button
              className="p-2 rounded-xl bg-white/10 active:bg-white/20 transition-colors"
              aria-label="Refresh balance"
            >
              <RefreshCw size={15} color="white" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="text-[40px] font-black tracking-tight tabular-nums leading-none"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            {balanceVisible ? balance.toFixed(2) : "●●●●●"}
          </span>
          <span className="text-2xl font-black leading-none" style={{ color: "#ff5c00" }}>
            π
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-5">
          <TrendingUp size={11} color="#4ade80" />
          <span className="text-xs text-green-400 font-medium">+2.3% this week</span>
        </div>

        {/* Wallet address */}
        <div className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-2.5">
          <div>
            <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">
              Wallet Address
            </p>
            <p className="text-xs text-white font-mono">{walletAddress}</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors"
            style={{
              backgroundColor: copied ? "#16a34a" : "#ff5c00",
              color: "white",
            }}
          >
            <Copy size={10} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 mt-4">
          {[
            { Icon: Download, label: "Receive" },
            { Icon: Send, label: "Send" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white/10 active:bg-white/20 transition-colors"
              aria-label={label}
            >
              <Icon size={18} color="white" />
              <span className="text-xs text-white/80 font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
              <ArrowDownLeft size={15} color="#16a34a" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Total In</span>
          </div>
          <p className="text-xl font-black text-foreground tabular-nums">
            {totalIn.toFixed(2)}{" "}
            <span className="text-sm" style={{ color: "#ff5c00" }}>
              π
            </span>
          </p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <ArrowUpRight size={15} color="#dc2626" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Total Out</span>
          </div>
          <p className="text-xl font-black text-foreground tabular-nums">
            {totalOut.toFixed(2)}{" "}
            <span className="text-sm" style={{ color: "#ff5c00" }}>
              π
            </span>
          </p>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-[15px] font-bold text-foreground"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Transactions
          </h3>
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-0.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all active:scale-95"
              style={{
                backgroundColor: filter === f.id ? "#ff5c00" : "var(--color-secondary)",
                color: filter === f.id ? "white" : "var(--color-muted-foreground)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filteredTx.map((tx) => {
            const { Icon, color, bg } = TX_META[tx.type];
            const isPositive = tx.amount > 0;
            return (
              <div
                key={tx.id}
                className="flex items-center gap-3 bg-card rounded-2xl border border-border p-3"
              >
                <div
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={17} color={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {tx.label}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{tx.date}</span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{
                        backgroundColor:
                          tx.status === "completed" ? "#f0fdf4" : "#fffbeb",
                        color: tx.status === "completed" ? "#16a34a" : "#b45309",
                      }}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-sm font-black tabular-nums"
                    style={{ color: isPositive ? "#16a34a" : "var(--color-foreground)" }}
                  >
                    {isPositive ? "+" : ""}
                    {tx.amount.toFixed(2)} π
                  </p>
                  {tx.txHash && (
                    <p className="text-[9px] text-muted-foreground font-mono mt-0.5">
                      {tx.txHash}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
