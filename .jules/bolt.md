## 2026-06-18 - TTI and DOM Reflow Bottlenecks in Vanilla HTML/JS

**Learning:** In a vanilla HTML/JS application, relying on `window.onload` for critical initialization scripts severely delays Time to Interactive (TTI) because it waits for all heavy external resources (e.g., iframes like Google Maps) to finish downloading. Additionally, inserting elements directly into the DOM inside a loop (e.g., `container.appendChild` in `forEach`) triggers O(N) reflows, causing performance bottlenecks during rendering.

**Action:** Execute initialization scripts directly at the end of the `<body>` instead of using `window.onload` to prevent TTI blocking. Consistently use `DocumentFragment` to batch dynamic DOM element insertions inside loops, inserting the entire fragment at once to ensure a single reflow.
