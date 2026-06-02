"use client";

import { usePiAuth } from "@/contexts/pi-auth-context";

export function AuthLoadingScreen() {
  const { authMessage, hasError, reinitialize } = usePiAuth();

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-8">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center gap-1">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-xl mb-4"
          style={{ backgroundColor: "#ff5c00", fontFamily: "var(--font-syne, sans-serif)" }}
        >
          π
        </div>
        <div className="flex items-baseline gap-0.5">
          <span
            className="text-3xl font-black tracking-tight"
            style={{ color: "#ff5c00", fontFamily: "var(--font-syne, sans-serif)" }}
          >
            em
          </span>
          <span
            className="text-3xl font-black tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            .
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center">Everything Market on Pi Network</p>
      </div>

      {/* Spinner / Error */}
      <div className="flex flex-col items-center gap-5">
        {hasError ? (
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#fff0e8" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff5c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        ) : (
          <div className="relative w-14 h-14">
            <div
              className="absolute inset-0 rounded-full border-4 animate-spin-slow"
              style={{ borderColor: "#ff5c00", borderTopColor: "transparent" }}
            />
            <div
              className="absolute inset-2 rounded-full flex items-center justify-center text-sm font-black"
              style={{ color: "#ff5c00", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              π
            </div>
          </div>
        )}

        <div className="text-center">
          <p
            className="text-sm font-semibold"
            style={{ color: hasError ? "#ff5c00" : "var(--foreground)" }}
          >
            {hasError ? "Authentication Failed" : "Connecting to Pi Network"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs text-center leading-relaxed">
            {authMessage}
          </p>
        </div>

        {hasError && (
          <button
            onClick={reinitialize}
            className="px-6 py-3 rounded-2xl text-white text-sm font-bold transition-transform active:scale-95"
            style={{ backgroundColor: "#ff5c00" }}
          >
            Try Again
          </button>
        )}
      </div>

      {/* Footer */}
      <p className="absolute bottom-8 text-[10px] text-muted-foreground">
        Powered by Pi Network
      </p>
    </div>
  );
}
