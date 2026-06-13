from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:8000/index.html")
    page.wait_for_timeout(500)

    # Scroll down to the form
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)

    # Fill out the form
    page.fill("#contact-name", "Test User")
    page.wait_for_timeout(500)
    page.fill("#contact-phone", "1234567890")
    page.wait_for_timeout(500)
    page.fill("#contact-message", "This is a test message.")
    page.wait_for_timeout(500)

    # Note: we are not actually clicking the submit button to avoid opening a new tab and breaking the test,
    # instead we will just take a screenshot of the filled form
    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
