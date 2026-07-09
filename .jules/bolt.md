Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.

## 2026-07-09 - Defer Rendering for Long Landing Pages
**Learning:** For long landing pages with many sections (like image galleries, catalogues, FAQs), rendering the entire DOM synchronously blocks the main thread and severely delays the initial First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
**Action:** Use `content-visibility: auto` along with a placeholder `contain-intrinsic-size` on below-the-fold or off-screen sections (e.g., creating a `.defer-render` utility class). This defers layout and rendering calculations until the sections approach the viewport, significantly improving initial load performance.
