Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2026-07-02 - Use Content-Visibility for Long Landing Pages
**Learning:** For a long landing page with multiple complex sections, deferring the rendering of below-the-fold content can dramatically improve initial load time (FCP/LCP) and main thread blocking.
**Action:** Use CSS `content-visibility: auto; contain-intrinsic-size: 1000px;` on all sections below the fold. This forces the browser to skip styling and layout for off-screen elements until they approach the viewport.
