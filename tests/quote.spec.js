const { test, expect } = require('@playwright/test');

test.describe('Quote Calculation Edge Cases', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the local server where index.html is hosted
        await page.goto('http://localhost:8000/index.html');
    });

    test('should calculate valid quote for quantity 1 (happy path)', async ({ page }) => {
        // Verify default value is 1
        const qtyInput = page.locator('#est-qty');
        await expect(qtyInput).toHaveValue('1');

        // Check calculation output for default values
        const finalRange = page.locator('#est-final-range');
        // Initial price string for 1 default product
        const initialText = await finalRange.innerText();

        // Assert it's a valid price string that looks like a range (e.g. ₹5,000 – ₹6,000)
        expect(initialText).toMatch(/₹\d{1,3}(,\d{3})*\s*–\s*₹\d{1,3}(,\d{3})*/);
    });

    test('should enforce minimum quantity of 1 for negative values', async ({ page }) => {
        const qtyInput = page.locator('#est-qty');
        const finalRange = page.locator('#est-final-range');

        // Ensure initial render text is loaded
        const initialText = await finalRange.innerText();

        // Fill with a negative number
        await qtyInput.fill('-5');
        // Trigger input event to run calculation
        await qtyInput.dispatchEvent('input');

        // The input value might still visibly be '-5', but calculation must treat it as 1.
        // Thus, the output range should be identical to the initial 1 unit calculation.
        const newText = await finalRange.innerText();
        expect(newText).toBe(initialText);

        // We can also check that the price doesn't contain a negative sign or evaluate to zero
        expect(newText).not.toContain('-'); // the dash for range is "–" en-dash, minus is "-"
        expect(newText).not.toBe('₹0 – ₹0');
    });

    test('should enforce minimum quantity of 1 for zero value', async ({ page }) => {
        const qtyInput = page.locator('#est-qty');
        const finalRange = page.locator('#est-final-range');

        const initialText = await finalRange.innerText();

        // Fill with 0
        await qtyInput.fill('0');
        await qtyInput.dispatchEvent('input');

        const newText = await finalRange.innerText();
        expect(newText).toBe(initialText);
        expect(newText).not.toBe('₹0 – ₹0');
    });
});
