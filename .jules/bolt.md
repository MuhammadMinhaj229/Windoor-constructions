## 2026-06-17 - Avoid window.onload and Batch DOM Insertions
**Learning:** This codebase relies on heavy external iframes (like Google Maps) which delay Time to Interactive (TTI) when initialization scripts use `window.onload`. Also, loops performing DOM insertions cause O(N) reflows.
**Action:** Execute initialization scripts directly at the end of the `<body>` instead of using `window.onload`. Use `DocumentFragment` to batch dynamic DOM element insertions to prevent reflows.
