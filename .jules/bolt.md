Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).

## 2026-08-01 - Caching Repeated DOM Queries for Interactive Elements
**Learning:** Frequent interactive functions like `filterCatalogue` that perform O(N) DOM queries (like `querySelectorAll` across product cards and tabs) can cause stuttering during UI interaction. While modern browsers optimize single ID lookups, querying node lists via class names repeatedly is an architectural bottleneck in plain HTML/JS apps.
**Action:** Always employ lazy initialization or state variables outside the event handler to cache node lists (`cachedCatItems`, `cachedCatTabs`) to ensure O(N) traversal is only done on the first click, preserving O(1) references for subsequent interactions.
