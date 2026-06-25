Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).

## 2024-06-25 - Caching DOM Queries in Event Handlers
**Learning:** Repetitive `document.querySelectorAll` calls inside frequently triggered event handlers (like catalogue category tabs) cause unnecessary O(N) DOM lookup overhead.
**Action:** Use lazy-initialization to cache static NodeLists (`cachedCatalogueItems`, `cachedCatTabs`) outside the handler function to improve performance during user interactions.
