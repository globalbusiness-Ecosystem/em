"use client";

import { useState, useRef } from "react";
import { Camera, Plus, X, CheckCircle, Upload } from "lucide-react";
import { CATEGORIES } from "./CategoryGrid";

export interface SellFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  images: string[];
}

const CONDITIONS = ["Brand New", "Like New", "Good", "Fair", "For Parts"];

export function SellForm() {
  const [form, setForm] = useState<SellFormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
    images: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({
          ...f,
          images: [...f.images, ev.target?.result as string].slice(0, 6),
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const isValid =
    form.title.trim() && form.price.trim() && form.category && form.condition;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-8 text-center gap-5">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#fff0e8" }}
        >
          <CheckCircle size={44} color="#ff5c00" strokeWidth={1.5} />
        </div>
        <div>
          <h2
            className="text-2xl font-black text-foreground"
            style={{ fontFamily: "var(--font-syne, sans-serif)" }}
          >
            Listing Live!
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Your item is now visible to buyers worldwide on the Pi Network.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              title: "",
              description: "",
              price: "",
              category: "",
              condition: "",
              location: "",
              images: [],
            });
          }}
          className="px-8 py-3.5 rounded-2xl text-white font-bold text-sm transition-transform active:scale-95"
          style={{ backgroundColor: "#ff5c00" }}
        >
          List Another Item
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col gap-5 pb-10">
      {/* Photo Upload */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-2">
          Photos{" "}
          <span className="text-muted-foreground font-normal">(up to 6)</span>
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {form.images.length < 6 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 w-20 h-20 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 transition-colors hover:border-primary"
              aria-label="Add photo"
            >
              <Camera size={20} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">Add Photo</span>
            </button>
          )}
          {form.images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 relative w-20 h-20 rounded-2xl overflow-hidden border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                aria-label={`Remove image ${i + 1}`}
              >
                <X size={10} color="white" />
              </button>
            </div>
          ))}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-1.5">
          Item Title <span style={{ color: "#ff5c00" }}>*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. iPhone 14 Pro 256GB Space Black"
          className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-1.5">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Describe your item — condition, features, why you're selling..."
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-1.5">
          Price in Pi <span style={{ color: "#ff5c00" }}>*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-foreground select-none">
            π
          </span>
          <input
            type="number"
            min="0"
            step="0.001"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="0.000"
            className="w-full pl-9 pr-4 py-3 rounded-2xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-2">
          Category <span style={{ color: "#ff5c00" }}>*</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = form.category === cat.id;
            const CatIcon = cat.Icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat.id }))}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all active:scale-95"
                style={{
                  borderColor: isSelected ? cat.iconColor : "transparent",
                  backgroundColor: isSelected ? cat.bgColor : "var(--color-secondary)",
                }}
                aria-pressed={isSelected}
                aria-label={cat.label}
              >
                <CatIcon
                  size={20}
                  color={isSelected ? cat.iconColor : "var(--color-muted-foreground)"}
                  strokeWidth={1.8}
                />
                <span
                  className="text-[9px] font-semibold text-center leading-tight"
                  style={{
                    color: isSelected
                      ? cat.iconColor
                      : "var(--color-muted-foreground)",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-2">
          Condition <span style={{ color: "#ff5c00" }}>*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((cond) => {
            const isSelected = form.condition === cond;
            return (
              <button
                key={cond}
                type="button"
                onClick={() => setForm((f) => ({ ...f, condition: cond }))}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all active:scale-95"
                style={{
                  backgroundColor: isSelected ? "#ff5c00" : "var(--color-secondary)",
                  borderColor: isSelected ? "#ff5c00" : "var(--color-border)",
                  color: isSelected ? "white" : "var(--color-foreground)",
                }}
                aria-pressed={isSelected}
              >
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-bold text-foreground block mb-1.5">
          Location
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          placeholder="City, Country"
          className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#ff5c00" }}
      >
        {loading ? (
          <>
            <Upload size={18} className="animate-bounce" />
            Publishing...
          </>
        ) : (
          <>
            <Plus size={18} />
            List Item for Sale
          </>
        )}
      </button>
    </form>
  );
}
