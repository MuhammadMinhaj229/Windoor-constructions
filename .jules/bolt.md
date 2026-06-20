## 2024-05-18 - Prevent Blocking TTI with Heavy Iframes and O(N) Reflows
**Learning:** Using `window.onload` for initialization in an app containing heavy external iframes (like Google Maps) significantly blocks Time to Interactive (TTI), as the browser waits for all iframe resources to finish downloading before executing the script. Also, appending dynamic elements individually inside a loop causes O(N) browser reflows.
**Action:** Execute initialization scripts directly at the end of the `<body>` tag rather than inside `window.onload`. Always use `DocumentFragment` to batch DOM element insertions inside loops to avoid O(N) reflows and minimize performance bottlenecks.
## 2024-05-19 - Efficient Background Images
**Learning:** Using `background-attachment: fixed` causes expensive layout repaints on scroll, leading to jank, especially on mobile devices.
**Action:** Use a fixed pseudo-element (e.g., `body::before` with `position: fixed; z-index: -1; pointer-events: none;`) instead. This pushes the background image to its own compositor layer, improving scrolling performance significantly.
