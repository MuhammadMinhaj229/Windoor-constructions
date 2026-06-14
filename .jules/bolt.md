## 2026-06-14 - [Scroll Jank Elimination]
**Learning:** Using `background-attachment: fixed` on the body tag causes continuous repaints during scrolling, which severely impacts scroll performance and causes jank, particularly on mobile devices.
**Action:** Instead of `background-attachment: fixed`, use a `body::before` pseudo-element with `position: fixed` and `z-index: -1` to hold the background image. This promotes the background to its own compositor layer and leverages hardware acceleration, completely eliminating scroll repaints.
