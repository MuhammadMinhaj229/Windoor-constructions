Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2026-07-03 - Defer Rendering of Off-Screen Sections
**Learning:** For a long landing page with many below-the-fold sections, rendering all sections simultaneously during the initial load negatively impacts First Contentful Paint (FCP) and Largest Contentful Paint (LCP). The browser spends valuable time calculating layouts for content the user cannot yet see.
**Action:** Implemented the `content-visibility: auto` property along with `contain-intrinsic-size: 1000px` on all below-the-fold sections. This architectural pattern defers layout and rendering calculations until the user scrolls near those sections, significantly accelerating the initial page load. Apply this pattern to any long, multi-section page in the codebase.
