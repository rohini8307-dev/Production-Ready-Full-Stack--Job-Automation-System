import os
import asyncio
from playwright.async_api import async_playwright

async def get_ats_score_from_autoapplymax(pdf_path: str, fallback_score: int = 85) -> int:
    """
    Automates autoapplymax.com to get an ATS score.
    """
    if not os.path.exists(pdf_path):
        return fallback_score
        
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Go to the site
            await page.goto("https://www.autoapplymax.com/tools/ats-score-checker", timeout=60000)
            
            # Upload the PDF resume
            await page.set_input_files('input[type="file"]', pdf_path)
            
            # Fill in a generic full-stack job description in the second textarea
            # (AutoApplyMax requires a job description to match against)
            job_description = "We are looking for a Full Stack Developer with strong experience in React, Python, JavaScript, Docker, AWS, and SQL. The ideal candidate should have experience in building scalable web applications, API design, and cloud infrastructure."
            textareas = await page.locator('.tool-textarea').all()
            if len(textareas) >= 2:
                # The second textarea is usually the Job Description
                await textareas[-1].fill(job_description)
            else:
                await page.locator('.tool-textarea').fill(job_description)
                
            # Click the analyze button
            await page.locator('.check-score-btn').click()
            
            # Wait for the results section to become visible
            await page.wait_for_selector('.score-gauge-number', state='visible', timeout=30000)
            
            # Extract the score
            score_text = await page.locator('.score-gauge-number').inner_text()
            
            await browser.close()
            
            try:
                return int(score_text.strip())
            except ValueError:
                return fallback_score
                
    except Exception as e:
        print(f"AutoApplyMax Scraper Error: {str(e)}")
        return fallback_score
