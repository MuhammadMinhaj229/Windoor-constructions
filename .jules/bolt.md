## 2024-06-13 - [Window Thread Performance]
**Learning:** Explicitly passing `noopener` and `noreferrer` parameters to `window.open` calls provides important multi-threaded isolation performance benefits to avoid UI blocking.
**Action:** Append `'noopener,noreferrer'` features string to new tab opens in inline JS.
