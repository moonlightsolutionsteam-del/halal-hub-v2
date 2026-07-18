"use client";

import { useEffect, useRef } from "react";
import type { Business } from "@/lib/types";
import { resolveCategoryMeta } from "./categories";

const LIGHT_TILES = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const DARK_TILES  = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_ATTR  = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const DARK_ATTR   = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com">CARTO</a>';

function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}

function makePinIcon(emoji: string, color: string, L: typeof import("leaflet")) {
  const html = `<div style="
      position:relative;width:36px;height:44px;
      display:flex;flex-direction:column;align-items:center;">
    <div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);background:${color};
      box-shadow:0 3px 8px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);font-size:16px;line-height:1;">${emoji}</span>
    </div>
    <div style="width:0;height:0;
      border-left:5px solid transparent;border-right:5px solid transparent;
      border-top:8px solid ${color};margin-top:-2px;"></div>
  </div>`;
  return L.divIcon({ html, className: "", iconSize: [36, 44], iconAnchor: [18, 44], popupAnchor: [0, -46] });
}

interface LeafletMapProps {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (business: Business) => void;
}

export default function LeafletMap({
  businesses,
  center = [20.5937, 78.9629],
  zoom = 5,
  onMarkerClick,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef      = useRef<import("leaflet").Map | null>(null);
  const tileRef     = useRef<import("leaflet").TileLayer | null>(null);
  const markersRef  = useRef<import("leaflet").Marker[]>([]);

  useEffect(() => {
    let cleanedUp = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cleanedUp || !containerRef.current || mapRef.current) return;

      // Inject Leaflet CSS once
      if (!document.querySelector('link[data-leaflet]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.setAttribute("data-leaflet", "1");
        document.head.appendChild(link);
      }

      const dark = isDarkMode();
      const map = L.map(containerRef.current, { center, zoom, zoomControl: false });
      L.control.zoom({ position: "topright" }).addTo(map);

      const tile = L.tileLayer(dark ? DARK_TILES : LIGHT_TILES, {
        attribution: dark ? DARK_ATTR : LIGHT_ATTR,
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      tileRef.current = tile;

      // Watch theme changes from HalalHub's theme toggle
      const observer = new MutationObserver(() => {
        if (!tileRef.current) return;
        tileRef.current.setUrl(isDarkMode() ? DARK_TILES : LIGHT_TILES);
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const mqHandler = () => { tileRef.current?.setUrl(isDarkMode() ? DARK_TILES : LIGHT_TILES); };
      mq.addEventListener("change", mqHandler);

      (map as any)._obs = observer;
      (map as any)._mq = mq;
      (map as any)._mqh = mqHandler;
    })();

    return () => {
      cleanedUp = true;
      if (mapRef.current) {
        const m = mapRef.current as any;
        m._obs?.disconnect();
        m._mq?.removeEventListener("change", m._mqh);
        mapRef.current.remove();
        mapRef.current = null;
        tileRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map) return;

      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      businesses.forEach(biz => {
        if (!biz.latitude || !biz.longitude) return;
        const meta = resolveCategoryMeta((biz.categoryId ?? (biz as any).category) || "");
        const icon = makePinIcon(meta.emoji, meta.color, L);
        const marker = L.marker([biz.latitude, biz.longitude], { icon }).addTo(map);
        marker.on("click", () => onMarkerClick?.(biz));
        markersRef.current.push(marker);
      });

      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.25), { maxZoom: 14 });
      }
    })();
  }, [businesses, onMarkerClick]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
