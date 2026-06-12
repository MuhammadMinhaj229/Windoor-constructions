import { test, expect } from '@playwright/test';

const pagesToTest = ['index.html', 'windoor-v2.html'];

for (const pageName of pagesToTest) {
    test.describe(`updateEstProduct function tests on ${pageName}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`http://localhost:8000/${pageName}`);
            // Wait for the dropdown to be visible
            await page.waitForSelector('#est-product');
        });

        test('should update est-final-range based on currentProduct when dropdown changes', async ({ page }) => {
            // Get initial range
            const initialRange = await page.textContent('#est-final-range');

            // Wait a little bit for the DOM update
            await page.selectOption('#est-product', 'WFC Doors & Frames');
            await page.waitForTimeout(100);

            const newRange = await page.textContent('#est-final-range');

            // Verify that the range text has changed
            expect(newRange).not.toBe(initialRange);
            expect(newRange).toContain('₹7,700');
        });
    });
}
