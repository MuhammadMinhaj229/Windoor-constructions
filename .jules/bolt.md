## 2026-06-16 - Optimize DOM Insertions and Initialization
**Learning:** window.onload blocks Time to Interactive (TTI) due to external assets needing to download; executing scripts directly at the end of the body avoids this. Additionally, batching DOM insertions with DocumentFragment avoids O(N) reflows.
**Action:** Use DocumentFragment for loops inserting DOM elements and avoid window.onload for initialization scripts.
