Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2024-05-18 - Defer Rendering with content-visibility
**Learning:** Using `content-visibility: auto` with a `contain-intrinsic-block-size` placeholder (e.g., `1000px`) on below-the-fold sections defers layout and rendering calculations, significantly improving initial FCP and LCP performance on long pages. Avoid using `contain-intrinsic-size` as it causes horizontal overflow bugs on mobile viewports.
**Action:** Always apply `content-visibility: auto` and `contain-intrinsic-block-size` to long, off-screen sections in vanilla HTML pages to optimize rendering.
