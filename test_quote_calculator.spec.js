const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Quote Calculator in windoor-v2.html', () => {
    test.beforeEach(async ({ page }) => {
        const filePath = `file://${path.resolve(__dirname, 'windoor-v2.html')}`;
        await page.goto(filePath);

        // Wait for the initial quote to be populated by the window.onload script
        await expect(page.locator('#est-final-range')).not.toBeEmpty();
    });

    test('should calculate default quote correctly', async ({ page }) => {
        const quoteText = await page.locator('#est-final-range').innerText();
        expect(quoteText).toBe('₹6,000 – ₹7,200');
    });

    test('should update quote based on quantity', async ({ page }) => {
        await page.fill('#est-qty', '5');
        const quoteText = await page.locator('#est-final-range').innerText();
        expect(quoteText).toBe('₹30,000 – ₹36,000');
    });

    test('should update quote based on thickness', async ({ page }) => {
        await page.selectOption('#est-thickness', '25mm');
        const quoteText = await page.locator('#est-final-range').innerText();
        expect(quoteText).toBe('₹5,520 – ₹6,624');

        await page.selectOption('#est-thickness', '35mm');
        const quoteText2 = await page.locator('#est-final-range').innerText();
        expect(quoteText2).toBe('₹6,720 – ₹8,064');

        await page.selectOption('#est-thickness', '40mm');
        const quoteText3 = await page.locator('#est-final-range').innerText();
        expect(quoteText3).toBe('₹7,440 – ₹8,928');
    });

    test('should update quote based on lock inclusion', async ({ page }) => {
        await page.uncheck('#est-lock');
        const quoteText = await page.locator('#est-final-range').innerText();
        expect(quoteText).toBe('₹4,800 – ₹5,760');
    });

    test('should update quote based on product type', async ({ page }) => {
        await page.selectOption('#est-product', 'WFC Doors & Frames');
        const quoteText = await page.locator('#est-final-range').innerText();
        expect(quoteText).toBe('₹7,700 – ₹9,240');
    });
});
