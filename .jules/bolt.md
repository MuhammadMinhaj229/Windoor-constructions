Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).

## 2024-06-27 - Caching DOM Queries in filterCatalogue
**Learning:** Calling `document.querySelectorAll('.catalogue-item')` on every click inside an interactive list filter causes expensive O(N) full DOM traversals, impacting Time to Interactive.
**Action:** Always cache frequently accessed node lists (`querySelectorAll`) outside of interactive event handlers when the DOM structure is static to prevent repetitive reflows and layout recalculations.
