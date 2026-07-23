import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print("Navigating to https://www.autoapplymax.com/tools/ats-score-checker...")
        try:
            response = await page.goto('https://www.autoapplymax.com/tools/ats-score-checker', timeout=30000)
            print(f"Status: {response.status}")
            content = await page.content()
            with open('autoapplymax.html', 'w', encoding='utf-8') as f:
                f.write(content)
            print("Saved to autoapplymax.html")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == '__main__':
    asyncio.run(run())
