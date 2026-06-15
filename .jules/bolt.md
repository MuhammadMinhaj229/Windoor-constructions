## 2026-06-15 - [DOM Optimization in Vanilla JS]
**Learning:** Repeated DOM querying and appending elements within a loop cause unnecessary reflows and block the main thread, especially in interactive static landing pages.
**Action:** Always cache NodeLists globally for frequently called interactive functions and use DocumentFragments for batch appending.
