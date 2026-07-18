import type { Business } from "@/lib/types";

export type CategoryMeta = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  dbValues: string[];
};

export const CATEGORIES_META: CategoryMeta[] = [
  { id: "food",          name: "Food & Dining",   emoji: "🍽️", color: "#f97316", dbValues: ["Food & Dining", "restaurant"] },
  { id: "meat",          name: "Meat & Butchers", emoji: "🥩", color: "#ef4444", dbValues: ["Meat Shops & Butchers", "meat"] },
  { id: "grocery",       name: "Grocery",         emoji: "🛒", color: "#10b981", dbValues: ["Grocery & Supermarkets"] },
  { id: "catering",      name: "Catering",        emoji: "🍲", color: "#3b82f6", dbValues: ["Catering Services"] },
  { id: "events",        name: "Events",          emoji: "🎉", color: "#a855f7", dbValues: ["Event Services", "Events & Conferences"] },
  { id: "mosques",       name: "Mosques",         emoji: "🕌", color: "#4f46e5", dbValues: ["Mosques & Islamic Centers", "mosque"] },
  { id: "travel",        name: "Travel",          emoji: "✈️", color: "#f59e0b", dbValues: ["Travel & Tourism"] },
  { id: "fashion",       name: "Fashion",         emoji: "👗", color: "#ec4899", dbValues: ["Fashion & Modest Wear", "fashion"] },
  { id: "cosmetics",     name: "Cosmetics",       emoji: "✨", color: "#f43f5e", dbValues: ["Cosmetics & Personal Care"] },
  { id: "finance",       name: "Finance",         emoji: "💳", color: "#6366f1", dbValues: ["Finance & Banking"] },
  { id: "healthcare",    name: "Healthcare",      emoji: "🏥", color: "#14b8a6", dbValues: ["Healthcare, Wellness & Spiritual Healing"] },
  { id: "education",     name: "Education",       emoji: "🎓", color: "#8b5cf6", dbValues: ["Education & Training", "education"] },
  { id: "media",         name: "Media",           emoji: "📚", color: "#64748b", dbValues: ["Bookstores & Islamic Media"] },
  { id: "certification", name: "Certification",   emoji: "🏅", color: "#059669", dbValues: ["Halal Certification Bodies & Services", "certification_bodies"] },
  { id: "creators",      name: "Creators",        emoji: "🎬", color: "#0ea5e9", dbValues: ["Creators", "creators"] },
  { id: "hotels",        name: "Hotels",          emoji: "🏨", color: "#0891b2", dbValues: ["Hotels & Homestays"] },
];

export function resolveCategoryMeta(dbCategory: string): CategoryMeta {
  const lower = (dbCategory ?? "").toLowerCase();
  return (
    CATEGORIES_META.find(c => c.dbValues.some(v => v.toLowerCase() === lower)) ?? {
      id: "other",
      name: dbCategory,
      emoji: "📍",
      color: "#6b7280",
      dbValues: [dbCategory],
    }
  );
}

export function businessMatchesCategories(biz: Business, selectedIds: string[]): boolean {
  if (selectedIds.length === 0) return true;
  const meta = resolveCategoryMeta(biz.categoryId ?? (biz as any).category ?? "");
  return selectedIds.includes(meta.id);
}
