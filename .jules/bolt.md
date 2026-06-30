Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).


## 2026-06-30 - Cache DOM queries in catalogue filter
**Learning:** Repetitive O(N) DOM querying (`querySelectorAll`) during user interaction events (like filtering the catalogue) can be a performance bottleneck, especially on mobile devices.
**Action:** Always cache expensive DOM queries outside handler functions (e.g., `filterCatalogue`) when the elements being queried are static after initial render.
