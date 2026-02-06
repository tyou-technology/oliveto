from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)

    # Scenario 1: Count > 0
    print("--- Scenario 1: Count = 42 ---")
    page = browser.new_page()

    # Intercept requests to /articles/count
    # Note: The API call might be to http://localhost:8080/articles/count
    # so matching **/articles/count should work.
    def handle_route(route):
        print(f"Intercepted: {route.request.url}")
        route.fulfill(
            status=200,
            content_type="application/json",
            body="42"
        )

    page.route("**/articles/count", handle_route)

    print("Navigating to home...")
    # Using localhost:3000
    try:
        page.goto("http://localhost:3000", timeout=30000)
    except Exception as e:
        print(f"Navigation failed: {e}")
        # Capture screenshot anyway if possible
        page.screenshot(path="/home/jules/verification/error.png")
        return

    # Wait for potential hydration/fetches
    page.wait_for_timeout(2000)

    # Check for "Artigos" link
    print("Checking for Artigos link (Expect Visible)...")
    artigos_link = page.get_by_role("link", name="Artigos")

    page.screenshot(path="/home/jules/verification/header_visible.png")

    if artigos_link.is_visible():
        print("PASS: Artigos link is visible.")
    else:
        print("FAIL: Artigos link is NOT visible.")

    page.close()

    # Scenario 2: Count = 0
    print("\n--- Scenario 2: Count = 0 ---")
    page2 = browser.new_page()

    def handle_route_zero(route):
        print(f"Intercepted (Zero): {route.request.url}")
        route.fulfill(
            status=200,
            content_type="application/json",
            body="0"
        )

    page2.route("**/articles/count", handle_route_zero)
    page2.goto("http://localhost:3000")
    page2.wait_for_timeout(2000)

    artigos_link2 = page2.get_by_role("link", name="Artigos")
    page2.screenshot(path="/home/jules/verification/header_hidden.png")

    if not artigos_link2.is_visible():
        print("PASS: Artigos link is hidden.")
    else:
        print("FAIL: Artigos link is visible (Should be hidden).")

    page2.close()
    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
