Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.
## 2026-07-18 - Defer Off-Screen Section Rendering
**Learning:** For long landing pages with many sections, using `content-visibility: auto` with `contain-intrinsic-block-size: 1000px` defers layout calculations for below-the-fold content, significantly improving initial FCP/LCP.
**Action:** Apply this pattern to all off-screen sections, but ensure to use `contain-intrinsic-block-size` instead of `contain-intrinsic-size` to avoid horizontal scroll overflow issues on mobile.
