"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ROUTES = [
  { label: "Home",       path: "/" },
  { label: "Feed",       path: "/feed" },
  { label: "Dashboard",  path: "/account/dashboard" },
  { label: "Explore",    path: "/explore" },
  { label: "Prayer",     path: "/prayer-times" },
  { label: "Directory",  path: "/categories" },
  { label: "Mosques",    path: "/mosques" },
  { label: "Events",     path: "/events" },
  { label: "Map",        path: "/map" },
]

const MOBILE_WIDTH = 390
const MOBILE_HEIGHT = 844

export default function DevPreviewPage() {
  const [path, setPath] = React.useState("/")
  const [customPath, setCustomPath] = React.useState("")
  const [desktopWidth, setDesktopWidth] = React.useState<"md" | "lg" | "xl">("lg")

  const activePath = customPath.startsWith("/") ? customPath : path
  const origin = typeof window !== "undefined" ? window.location.origin : ""

  const desktopWidths = { md: 768, lg: 1280, xl: 1440 }
  const dw = desktopWidths[desktopWidth]

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Top toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0 overflow-x-auto no-scrollbar">
        {/* Route pills */}
        <div className="flex gap-1.5 shrink-0">
          {ROUTES.map(r => (
            <button
              key={r.path}
              onClick={() => { setPath(r.path); setCustomPath("") }}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                activePath === r.path && !customPath
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Custom path */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-zinc-500 text-xs font-mono">/</span>
          <input
            placeholder="custom/path"
            value={customPath.replace(/^\//, "")}
            onChange={e => setCustomPath("/" + e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <span className="text-zinc-600 text-xs">Desktop:</span>
          {(["md", "lg", "xl"] as const).map(w => (
            <button
              key={w}
              onClick={() => setDesktopWidth(w)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                desktopWidth === w ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"
              )}
            >
              {w === "md" ? "768" : w === "lg" ? "1280" : "1440"}
            </button>
          ))}
        </div>
      </div>

      {/* Preview frames */}
      <div className="flex flex-1 gap-4 p-4 overflow-x-auto overflow-y-hidden">

        {/* Mobile frame */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Mobile</span>
            <span className="text-zinc-600 text-[10px] font-mono">{MOBILE_WIDTH}×{MOBILE_HEIGHT}</span>
          </div>
          {/* Phone shell */}
          <div
            className="relative rounded-[2.5rem] bg-zinc-900 border-4 border-zinc-700 shadow-2xl overflow-hidden"
            style={{ width: MOBILE_WIDTH + 24, height: MOBILE_HEIGHT + 48 }}
          >
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-800 rounded-full z-10" />
            <div className="absolute inset-[4px] rounded-[2rem] overflow-hidden bg-white">
              <iframe
                key={activePath + "-mobile"}
                src={origin + activePath}
                style={{ width: MOBILE_WIDTH, height: MOBILE_HEIGHT, border: "none", transform: "scale(1)", transformOrigin: "top left" }}
                title="Mobile preview"
              />
            </div>
          </div>
          <span className="text-zinc-600 text-[10px]">iPhone 14 Pro</span>
        </div>

        {/* Desktop frame */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Desktop</span>
            <span className="text-zinc-600 text-[10px] font-mono">{dw}×900</span>
          </div>
          {/* Browser chrome */}
          <div className="w-full max-w-full rounded-xl overflow-hidden border border-zinc-700 shadow-2xl bg-zinc-800" style={{ maxWidth: dw }}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 bg-zinc-800 rounded-md px-3 py-1 text-xs font-mono text-zinc-500">
                localhost:9002{activePath}
              </div>
            </div>
            <div className="overflow-hidden" style={{ height: 740 }}>
              <iframe
                key={activePath + "-desktop"}
                src={origin + activePath}
                style={{ width: "100%", height: 740, border: "none" }}
                title="Desktop preview"
              />
            </div>
          </div>
          <span className="text-zinc-600 text-[10px]">Desktop</span>
        </div>
      </div>
    </div>
  )
}
