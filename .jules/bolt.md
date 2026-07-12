Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2026-07-03 - Defer Below-The-Fold Content Rendering
**Learning:** For long landing pages, applying `content-visibility: auto` to off-screen sections drastically improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP) by skipping layout and rendering calculations until needed. However, using `contain-intrinsic-size: 1000px` applies to both dimensions, causing severe horizontal overflow and breaking mobile layouts.
**Action:** Always use `contain-intrinsic-block-size: 1000px` (or appropriate height) when applying `content-visibility: auto` to maintain proper width calculations and prevent horizontal scroll issues on mobile devices.
