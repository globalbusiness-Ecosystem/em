"use client";

import { useState } from "react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

interface EmPayButtonProps {
  /** Visual variant: 'primary' = full-width pill, 'compact' = small inline pill */
  variant?: "primary" | "compact";
  className?: string;
}

export function EmPayButton({ variant = "primary", className = "" }: EmPayButtonProps) {
  const { products } = usePiAuth();
  const [status, setStatus] = useState<"idle" | "paying" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69aa0d2561f122096c678a08
  );

  const amount = product?.price_in_pi ?? null;
  const disabled = !product || status === "paying";

  const handlePay = () => {
    if (!product || amount === null) return;

    setStatus("paying");
    setErrorMsg(null);

    if (typeof window !== "undefined" && typeof window.pay === "function") {
      window.pay({
        amount,
        memo: product.name,
        metadata: { productId: product.id },
        onComplete: () => {
          setStatus("success");
          setTimeout(() => setStatus("idle"), 3500);
        },
        onError: (error: unknown) => {
          const msg =
            error instanceof Error ? error.message : "Payment failed. Please try again.";
          setErrorMsg(msg);
          setStatus("error");
          setTimeout(() => {
            setStatus("idle");
            setErrorMsg(null);
          }, 3500);
        },
      });
    } else {
      // Preview/non-Pi-browser fallback
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  /* ── Label helpers ──────────────────────────────────────────────────── */
  const priceLabel = amount !== null ? `${amount} π` : "";

  if (variant === "compact") {
    return (
      <div className={`flex flex-col items-start gap-1 ${className}`}>
        <button
          onClick={handlePay}
          disabled={disabled}
          aria-label={
            !product
              ? "Em payment unavailable"
              : `Buy ${product.name} for ${priceLabel}`
          }
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor:
              status === "success"
                ? "#16a34a"
                : status === "error"
                ? "#dc2626"
                : "#ff5c00",
          }}
        >
          {status === "paying" && (
            <svg
              className="animate-spin"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          )}
          {status === "success" && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {status === "idle" && !product && "Unavailable"}
          {status === "idle" && product && (
            <>
              Buy · {priceLabel}
            </>
          )}
          {status === "paying" && "Processing…"}
          {status === "success" && "Paid!"}
          {status === "error" && "Failed"}
        </button>
        {status === "error" && errorMsg && (
          <p className="text-[10px] text-red-500 leading-tight max-w-[160px]">{errorMsg}</p>
        )}
      </div>
    );
  }

  /* ── Primary variant ────────────────────────────────────────────────── */
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <button
        onClick={handlePay}
        disabled={disabled}
        aria-label={
          !product
            ? "Em payment unavailable"
            : `Buy ${product.name} for ${priceLabel}`
        }
        className="px-5 py-2.5 rounded-xl text-xs font-black text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        style={{
          backgroundColor:
            status === "success"
              ? "#16a34a"
              : status === "error"
              ? "#dc2626"
              : "#1a1a1a",
          border: "2px solid",
          borderColor:
            status === "success"
              ? "#16a34a"
              : status === "error"
              ? "#dc2626"
              : "#ff5c00",
        }}
      >
        {status === "paying" && (
          <svg
            className="animate-spin"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="white"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {status === "success" && (
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2.5 7l3 3 6-6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {status === "idle" && !product && "Payment Unavailable"}
        {status === "idle" && product && (
          <span>
            Pay <span style={{ color: "#ff5c00" }}>{priceLabel}</span> · Em
          </span>
        )}
        {status === "paying" && "Processing…"}
        {status === "success" && "Payment Successful!"}
        {status === "error" && "Payment Failed"}
      </button>
      {status === "error" && errorMsg && (
        <p className="text-[10px] text-red-500 leading-tight">{errorMsg}</p>
      )}
    </div>
  );
}
