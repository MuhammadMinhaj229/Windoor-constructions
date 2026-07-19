Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2023-10-25 - Implement content-visibility for long pages
**Learning:** Long landing pages suffer from slow initial paint times due to the browser calculating layout for off-screen elements. Using `content-visibility: auto` with `contain-intrinsic-block-size` defers these calculations until the elements are scrolled into view, significantly improving FCP and LCP. Avoid `contain-intrinsic-size` as it can cause horizontal overflow on mobile.
**Action:** Apply `content-visibility: auto` and `contain-intrinsic-block-size: 1000px` to below-the-fold `<section>` elements on long pages to improve initial load performance.
