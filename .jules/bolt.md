## 2024-03-24 - [Avoid `window.onload` and use `DocumentFragment`]
**Learning:** `window.onload` waits for all assets (including external iframes/images) to load before firing, which delays script execution. Repeatedly appending elements directly to the DOM in a loop causes multiple reflows, decreasing rendering performance.
**Action:** Execute scripts directly at the end of the `<body>` to initialize scripts as soon as the DOM is parsed. Use a `DocumentFragment` to batch DOM node insertions and append them to the DOM in a single operation, avoiding multiple reflows.
