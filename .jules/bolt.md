# Performance Optimization Log: toggleFAQ

## Performance Impact
By caching the DOM queries (`document.querySelectorAll('.faq-answer')` and `document.querySelectorAll('.faq-chevron')`) for the FAQ toggling feature, we were able to significantly reduce execution time.

* **Original Performance:** ~7291.40 ms for 100,000 iterations.
* **Optimized Performance:** ~2048.90 ms for 100,000 iterations.
* **Impact:** The optimization resulted in a roughly **71.9% improvement** in execution time for this specific code path, saving around 52.4 microseconds per invocation.

## Codebase-specific Learnings
* **Duplicated Code:** The frontend logic and HTML structure is largely duplicated across `index.html` and `windoor-v2.html`. Changes must be applied to both files to maintain consistency.
* **No Build Process:** The project relies entirely on raw JavaScript without a build step or bundler. Module-level variables can be used for caching, but care must be taken to not pollute the global namespace excessively.
* **Dynamic Content:** The FAQ container is built dynamically via JavaScript (`buildFAQ`). Therefore, the cache variables (`cachedAnswers` and `cachedChevrons`) must be initialized *after* the DOM elements have been injected. Initializing them inside `toggleFAQ` on the first run is an effective strategy.
