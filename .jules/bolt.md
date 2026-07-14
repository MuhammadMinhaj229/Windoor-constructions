Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.
## 2026-07-02 - Content Visibility Placeholder Dimensions
**Learning:** Using `contain-intrinsic-size: 1000px` for `content-visibility: auto` applies the size to both width and height, causing severe horizontal overflow bugs on mobile viewports (<1000px wide).
**Action:** Use `contain-intrinsic-block-size` instead to only set the placeholder height, deferring layout safely without breaking mobile width.
