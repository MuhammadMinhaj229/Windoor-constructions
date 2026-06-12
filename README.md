# Windoor Constructions

Welcome to the official repository for **Windoor Constructions**, a regional distributor of premium WPC, WFC, and PVC doors and hardware in Warangal and Hanamkonda, Telangana.

This landing page acts as a B2B and B2C entry point, connecting building contractors, architects, and direct buyers with high-quality, termite-proof, and waterproof construction materials.

## Key Features
*   **Dual Theme UI:** Fully functional and aesthetically cohesive light and dark mode toggles implemented seamlessly with Tailwind CSS.
*   **Dynamic Quote Estimator:** An integrated product estimator, allowing visitors to visually configure dimensions, features, and material types, offering immediate WhatsApp-forwarded quotes.
*   **Mobile-First Design:** Complete responsive styling specifically crafted to operate perfectly across mobile interfaces and desktop viewports, with quick-dial support functionality.
*   **Lead Generation Funnel:** Optimized contact sections tailored to funnel queries directly into direct-response WhatsApp consultations.

## Technology Stack
The project is built entirely on a lightweight static stack:
*   **HTML5**
*   **Tailwind CSS** (via CDN for styling and layout)
*   **Vanilla JavaScript** (for interactive logic, dark mode switching, estimation functionality, and mobile navigation)

## Development Setup

The repository relies strictly on static files. You can preview the application by serving the `index.html` file through any standard local HTTP server.

```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

## Repository Structure
*   `index.html`: The core and sole application entry point containing the full structural markup, styling links, and all application-specific JavaScript logic.
*   `assets/images/`: Stores all local media, specifically branding material like the official `logo.png`.
*   *(Note: The previous `windoor-v2.html` dark-mode iteration has been comprehensively merged into `index.html` and deleted).*

## Maintenance
To make style updates, edit the Tailwind class strings within `index.html`. For new interactive features, modify the JavaScript scripts directly within the document.
