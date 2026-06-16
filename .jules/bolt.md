## 2024-06-16 - Prevent Layout Thrashing in buildFAQ and Avoid window.onload
**Learning:** Using `container.appendChild(div)` inside a loop causes O(N) reflows (layout thrashing) which blocks rendering. Additionally, `window.onload` delays execution of initial scripts unnecessarily because it waits for all heavy external resources (like iframes or images) to load before triggering.
**Action:** Use a `DocumentFragment` to batch DOM node insertions and execute initialization logic immediately at the end of the `<body>` (before `</body>`) instead of tying it to `window.onload`.
