Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).

## 2026-06-21 - DOM Query Caching in Interactive Functions
**Learning:** Interactive functions attached to UI elements (like filter tabs or visual customizers) execute on every user interaction. Performing DOM queries (like `querySelectorAll` or `getElementById`) inside these functions on every invocation creates unnecessary layout and computation overhead, leading to slower perceived interactions.
**Action:** Declare variables outside the handler functions and query the DOM elements only once (lazy initialization via an `if` check or on initial load). Then, reuse the cached DOM elements on subsequent interactions to avoid O(N) reflows and repeated node lookups.
