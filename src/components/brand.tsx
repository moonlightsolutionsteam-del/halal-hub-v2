import { cn } from "@/lib/utils";

/**
 * HalalHubMark — the official "H" icon mark (H with a smile crossbar).
 * Uses currentColor so it inherits text colour (e.g. white on the green badge).
 * viewBox is cropped tight to the glyph so it fills its container.
 */
export function HalalHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="285 285 430 430"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Halal Hub"
    >
      <path d="M403.84,292.98h-60.47v138.31c17.26,18.4,37.7,33.72,60.47,45.13V292.98z" />
      <path d="M596.16,707.02h60.68V549.17c-19,11.27-39.32,20.54-60.68,27.54V707.02z" />
      <path d="M677.32,432.03c-6.34,7.61-13.22,14.75-20.48,21.49V292.98h-60.68v201.2c-7.59,3.49-15.41,6.58-23.41,9.25c-22.87,7.61-47.31,11.8-72.75,11.8c-71.4,0-135.08-32.27-177.43-83.09l-28.3,23.63l-18.44,15.39c5.82,6.96,12.01,13.58,18.44,19.97c7.62,7.57,15.65,14.72,24.07,21.42c8.01,6.37,16.37,12.31,25.03,17.83v176.64h60.47V559.73c14.78,5.14,30.11,9.12,45.87,11.85c16.33,2.83,33.14,4.32,50.29,4.32c73.79,0,141.15-27.38,192.57-72.48c11.33-9.94,21.92-20.71,31.6-32.26L677.32,432.03z" />
    </svg>
  );
}

/**
 * HalalHubBadge — the H mark inside the brand green rounded square.
 * Drop-in replacement for the old MessageSquare logo badge.
 */
export function HalalHubBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-primary rounded-xl flex items-center justify-center text-white shrink-0",
        className
      )}
    >
      <HalalHubMark className="w-2/3 h-2/3" />
    </div>
  );
}
