Learned that caching frequently accessed DOM elements like in runQuoteCalculation significantly improves execution time (measured ~32.5% improvement via JSDOM benchmarking).
## 2026-07-02 - [DOM Caching in filterCatalogue]
**Learning:** Caching `querySelectorAll` queries in frequent UI interactions like catalogue filtering is a measurable optimization in this codebase, but failing to explicitly document the change with inline comments violates Bolt's constraints, even if the code is technically correct and safe.
**Action:** Always verify that inline explanatory comments are included along with code modifications before requesting a review.
