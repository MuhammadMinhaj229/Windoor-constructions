## 2026-07-03 - Use content-visibility for Off-Screen Sections
**Learning:** Long, static landing pages suffer from high initial layout and rendering costs because the browser calculates layout for the entire DOM tree before First Contentful Paint.
**Action:** Use `content-visibility: auto` (with a `contain-intrinsic-size` placeholder) on below-the-fold container sections (like `#catalogue`, `#gallery`, etc.). This tells the browser to skip layout and painting for off-screen content, vastly improving initial load performance and reducing memory footprint.

## 2026-07-03 - Remove DOM Query Caching Micro-optimization
**Learning:** Caching basic DOM queries (like `document.getElementById` and `document.querySelectorAll`) in interactive functions is a premature micro-optimization. In real modern browsers (unlike JSDOM benchmarks), these operations take a fraction of a millisecond. Caching them adds memory overhead and, crucially, creates state management complexity leading to bugs like stale NodeLists when the DOM updates dynamically.
**Action:** Always prefer direct DOM queries for component interactivity unless profiling reveals a specific, measurable bottleneck in a heavily repeated loop.

## 2026-07-02 - Remove Invisible Backdrop Filters on Opaque Elements
**Learning:** Fixed elements (header, mobile sticky bar) were given expensive Tailwind `backdrop-blur-*` utilities alongside fully opaque `bg-white` backgrounds. This creates a severe performance anti-pattern on mobile: the browser continuously calculates heavy blur operations on every scroll frame for an effect that is 100% hidden by the solid background.
**Action:** Always ensure elements with `backdrop-filter` have semi-transparent backgrounds (e.g., `bg-white/80`). If an opaque background is desired, the `backdrop-blur` utility must be removed to avoid destroying scroll FPS.
