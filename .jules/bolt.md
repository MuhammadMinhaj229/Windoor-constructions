Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.
## 2026-07-10 - Defer Rendering Off-screen Sections
**Learning:** For long landing pages with many heavy DOM elements below the fold, rendering everything upfront blocks the main thread and impacts initial First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
**Action:** Always use `content-visibility: auto` along with `contain-intrinsic-size` (e.g., `1000px`) on major off-screen sections (like galleries, catalogues, estimators, etc.) to skip styling, layout, and paint until the user scrolls them near the viewport. This significantly improves load time.
