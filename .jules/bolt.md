Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2026-07-06 - Defer Layout with content-visibility
**Learning:** For long landing pages like this codebase's index.html with heavy DOM structures, rendering off-screen elements initially creates a performance bottleneck. The browser spends valuable main-thread time calculating layout for sections the user won't immediately see, degrading First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
**Action:** Always apply `content-visibility: auto` along with a placeholder `contain-intrinsic-size` (e.g., `1000px`) to below-the-fold `<section>` elements. This defers rendering and layout calculations until the user scrolls near those sections, dramatically improving initial page load performance.
