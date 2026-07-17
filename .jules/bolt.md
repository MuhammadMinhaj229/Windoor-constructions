Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2026-07-03 - Defer Off-Screen Rendering with Content-Visibility
**Learning:** For long landing pages like index.html, the browser initially calculates layout and rendering for all elements, including those far below the fold, causing high First Contentful Paint (FCP) and Largest Contentful Paint (LCP) times.
**Action:** Apply `content-visibility: auto` along with a `contain-intrinsic-block-size: 1000px` placeholder to off-screen or below-the-fold sections to defer rendering and improve initial load performance.
