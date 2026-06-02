"use client";

import { useState } from "react";
import {
  X,
  Palette,
  Globe,
  DollarSign,
  Bell,
  Info,
  Check,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

interface SettingsPageProps {
  open: boolean;
  onClose: () => void;
}

type Theme = "light" | "dark" | "system";
type Language = "en" | "ar" | "fr" | "es" | "zh";
type Currency = "PI" | "USD" | "EUR" | "GBP" | "AED";

const THEMES: { value: Theme; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { value: "light",  label: "Light",  Icon: Sun     },
  { value: "dark",   label: "Dark",   Icon: Moon    },
  { value: "system", label: "System", Icon: Monitor },
];

const LANGUAGES: { value: Language; label: string; native: string }[] = [
  { value: "en", label: "English",  native: "English"  },
  { value: "ar", label: "Arabic",   native: "العربية"  },
  { value: "fr", label: "French",   native: "Français" },
  { value: "es", label: "Spanish",  native: "Español"  },
  { value: "zh", label: "Chinese",  native: "中文"      },
];

const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: "PI",  label: "Pi",          symbol: "π"  },
  { value: "USD", label: "US Dollar",   symbol: "$"  },
  { value: "EUR", label: "Euro",        symbol: "€"  },
  { value: "GBP", label: "Pound",       symbol: "£"  },
  { value: "AED", label: "UAE Dirham",  symbol: "د.إ" },
];

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-5 pb-2">
      <span style={{ color: "#ff5c00" }}>{icon}</span>
      <h2
        className="text-[13px] font-bold uppercase tracking-wider"
        style={{ color: "#ff5c00", fontFamily: "var(--font-syne, sans-serif)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function OptionRow({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-3.5 transition-colors"
      style={{ backgroundColor: selected ? "#fff0e8" : "transparent" }}
    >
      <div className="flex flex-col items-start gap-0.5">
        <span
          className="text-sm font-semibold"
          style={{ color: selected ? "#ff5c00" : "var(--color-foreground)" }}
        >
          {label}
        </span>
        {sub && (
          <span className="text-[11px] text-muted-foreground">{sub}</span>
        )}
      </div>
      {selected && <Check size={16} color="#ff5c00" strokeWidth={2.5} />}
    </button>
  );
}

function ToggleRow({
  label,
  sub,
  value,
  onChange,
}: {
  label: string;
  sub?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {sub && <span className="text-[11px] text-muted-foreground">{sub}</span>}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
        style={{ backgroundColor: value ? "#ff5c00" : "var(--color-border)" }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: value ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href?: string }) {
  return (
    <button className="flex items-center justify-between w-full px-4 py-3.5 transition-colors hover:bg-secondary">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <ChevronRight size={16} className="text-muted-foreground" />
    </button>
  );
}

export function SettingsPage({ open, onClose }: SettingsPageProps) {
  const [theme,    setTheme]    = useState<Theme>("system");
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("PI");
  const [notifPush,   setNotifPush]   = useState(true);
  const [notifDeals,  setNotifDeals]  = useState(true);
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifPromo,  setNotifPromo]  = useState(false);

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

      {/* Panel — slides up from bottom */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          maxHeight: "92dvh",
          backgroundColor: "var(--color-background)",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          transform: open ? "translateY(0)" : "translateY(100%)",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Handle + title */}
        <div
          className="flex flex-col items-center px-4 pt-3 pb-3 border-b shrink-0"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="w-10 h-1 rounded-full mb-3"
            style={{ backgroundColor: "var(--color-border)" }}
          />
          <div className="flex items-center justify-between w-full">
            <h1
              className="text-base font-black text-foreground"
              style={{ fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Settings
            </h1>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Close settings"
            >
              <X size={17} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 pb-8">

          {/* ── Theme ─────────────────────────────────────────── */}
          <SectionHeader icon={<Palette size={14} />} title="Theme" />
          <div
            className="mx-4 rounded-2xl overflow-hidden border divide-y"
            style={{ borderColor: "var(--color-border)", divideColor: "var(--color-border)" }}
          >
            {THEMES.map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className="flex items-center justify-between w-full px-4 py-3.5 transition-colors"
                style={{ backgroundColor: theme === value ? "#fff0e8" : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: theme === value ? "#ff5c00" : "var(--color-foreground)" }}
                  >
                    {label}
                  </span>
                </div>
                {theme === value && <Check size={16} color="#ff5c00" strokeWidth={2.5} />}
              </button>
            ))}
          </div>

          {/* ── Language ──────────────────────────────────────── */}
          <SectionHeader icon={<Globe size={14} />} title="Language" />
          <div
            className="mx-4 rounded-2xl overflow-hidden border divide-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            {LANGUAGES.map(({ value, label, native }) => (
              <OptionRow
                key={value}
                label={label}
                sub={native !== label ? native : undefined}
                selected={language === value}
                onClick={() => setLanguage(value)}
              />
            ))}
          </div>

          {/* ── Currency ──────────────────────────────────────── */}
          <SectionHeader icon={<DollarSign size={14} />} title="Display Currency" />
          <div
            className="mx-4 rounded-2xl overflow-hidden border divide-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            {CURRENCIES.map(({ value, label, symbol }) => (
              <OptionRow
                key={value}
                label={label}
                sub={symbol}
                selected={currency === value}
                onClick={() => setCurrency(value)}
              />
            ))}
          </div>

          {/* ── Notifications ─────────────────────────────────── */}
          <SectionHeader icon={<Bell size={14} />} title="Notifications" />
          <div
            className="mx-4 rounded-2xl overflow-hidden border divide-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            <ToggleRow label="Push Notifications" sub="Receive alerts on your device" value={notifPush}   onChange={setNotifPush}   />
            <ToggleRow label="Flash Deals"         sub="Limited-time offers"           value={notifDeals}  onChange={setNotifDeals}  />
            <ToggleRow label="Order Updates"        sub="Shipping & delivery status"   value={notifOrders} onChange={setNotifOrders} />
            <ToggleRow label="Promotions"           sub="Coupons and special offers"   value={notifPromo}  onChange={setNotifPromo}  />
          </div>

          {/* ── About ─────────────────────────────────────────── */}
          <SectionHeader icon={<Info size={14} />} title="About" />
          <div
            className="mx-4 rounded-2xl overflow-hidden border divide-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            <InfoRow label="App Name"    value="em. — Everything Market" />
            <InfoRow label="Domain"      value="em.pi" />
            <InfoRow label="Version"     value="1.0.0" />
            <InfoRow label="Network"     value="Pi Network" />
            <LinkRow label="Privacy Policy" />
            <LinkRow label="Terms of Service" />
            <LinkRow label="Open Source Licenses" />
          </div>
        </div>
      </div>
    </>
  );
}
