Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).

## 2026-06-26 - [O(N) Query Selector Caching]
**Learning:** Calling `document.querySelectorAll` inside interactive filter functions triggers an expensive O(N) DOM traversal on every user click, which can cause frame drops.
**Action:** Always cache static `querySelectorAll` NodeLists (e.g., catalogue items, category tabs) outside the handler or initialize them on the first run.
