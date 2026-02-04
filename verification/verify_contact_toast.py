from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to /contatos...")
        try:
            page.goto("http://localhost:3000/contatos", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            page.screenshot(path="verification/error_nav.png")
            browser.close()
            return

        print("Waiting for form...")
        try:
            page.wait_for_selector("form", timeout=10000)
        except Exception as e:
             print(f"Form not found: {e}")
             page.screenshot(path="verification/error_form.png")
             browser.close()
             return

        print("Filling form...")
        page.get_by_placeholder("nome.").fill("Test User")
        page.get_by_placeholder("email.").fill("test@example.com")
        page.get_by_placeholder("cidade.").fill("Test City")
        page.get_by_placeholder("telefone.").fill("11999999999")
        page.get_by_placeholder("mensagem.").fill("Hello this is a test message.")

        print("Submitting...")
        # We expect a new page (tab) but we really care about the toast on the current page
        # The new page might be blocked or handled differently in headless, but the click happens.
        page.get_by_text("ENVIAR.").click()

        print("Waiting for toast...")
        try:
            toast_locator = page.get_by_text("Mensagem pronta! Abrindo WhatsApp...")
            expect(toast_locator).to_be_visible(timeout=10000)
            print("Toast found!")
        except Exception as e:
            print(f"Toast not found: {e}")

        print("Taking screenshot...")
        page.screenshot(path="verification/contact_toast.png")

        browser.close()

if __name__ == "__main__":
    run()
