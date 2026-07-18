"use client";

import { useEffect, useRef } from "react";
import type { Business } from "@/lib/types";

export type CategoryColor = {
  bg: string;
  border: string;
  text: string;
};

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  food_dining:            { bg: "#f97316", border: "#ea580c", text: "#fff" },
  "Food & Dining":        { bg: "#f97316", border: "#ea580c", text: "#fff" },
  restaurant:             { bg: "#f97316", border: "#ea580c", text: "#fff" },
  meat_shops:             { bg: "#ef4444", border: "#dc2626", text: "#fff" },
  "Meat Shops & Butchers":{ bg: "#ef4444", border: "#dc2626", text: "#fff" },
  meat:                   { bg: "#ef4444", border: "#dc2626", text: "#fff" },
  grocery:                { bg: "#10b981", border: "#059669", text: "#fff" },
  catering:               { bg: "#3b82f6", border: "#2563eb", text: "#fff" },
  events_services:        { bg: "#a855f7", border: "#9333ea", text: "#fff" },
  events_conferences:     { bg: "#a855f7", border: "#9333ea", text: "#fff" },
  mosques:                { bg: "#4f46e5", border: "#4338ca", text: "#fff" },
  mosque:                 { bg: "#4f46e5", border: "#4338ca", text: "#fff" },
  "Mosques & Islamic Centers": { bg: "#4f46e5", border: "#4338ca", text: "#fff" },
  travel_tourism:         { bg: "#f59e0b", border: "#d97706", text: "#fff" },
  fashion_modest:         { bg: "#ec4899", border: "#db2777", text: "#fff" },
  cosmetics:              { bg: "#f43f5e", border: "#e11d48", text: "#fff" },
  finance_banking:        { bg: "#6366f1", border: "#4f46e5", text: "#fff" },
  healthcare_wellness:    { bg: "#14b8a6", border: "#0d9488", text: "#fff" },
  education_training:     { bg: "#8b5cf6", border: "#7c3aed", text: "#fff" },
  bookstores:             { bg: "#64748b", border: "#475569", text: "#fff" },
  certification_bodies:   { bg: "#059669", border: "#047857", text: "#fff" },
  creators:               { bg: "#0ea5e9", border: "#0284c7", text: "#fff" },
};

const DEFAULT_COLOR: CategoryColor = { bg: "#6b7280", border: "#4b5563", text: "#fff" };

function getCategoryColor(categoryId: string): CategoryColor {
  return CATEGORY_COLORS[categoryId] ?? DEFAULT_COLOR;
}

function makeDivIcon(categoryId: string, L: typeof import("leaflet")) {
  const color = getCategoryColor(categoryId);
  const html = `
    <div style="
      width:32px;height:32px;border-radius:50%;
      background:${color.bg};
      border:3px solid ${color.border};
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
      display:flex;align-items:center;justify-content:center;
    ">
      <div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.8);"></div>
    </div>
  `;
  return L.divIcon({ html, className: "", iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -20] });
}

interface LeafletMapProps {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (business: Business) => void;
}

export default function LeafletMap({ businesses, center = [20.5937, 78.9629], zoom = 5, onMarkerClick }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").Marker[]>([]);

  useEffect(() => {
    let L: typeof import("leaflet");

    async function init() {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center,
        zoom,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom zoom control top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      mapRef.current = map;
    }

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when businesses change
  useEffect(() => {
    async function updateMarkers() {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map) return;

      // Remove old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      businesses.forEach(biz => {
        if (!biz.latitude || !biz.longitude) return;

        const icon = makeDivIcon(biz.categoryId ?? biz.category ?? "", L);
        const marker = L.marker([biz.latitude, biz.longitude], { icon }).addTo(map);

        marker.on("click", () => {
          onMarkerClick?.(biz);
        });

        markersRef.current.push(marker);
      });

      // Fit bounds if we have markers
      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 14 });
      }
    }

    updateMarkers();
  }, [businesses, onMarkerClick]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
