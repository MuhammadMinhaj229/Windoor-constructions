import { test, expect } from '@playwright/test';

const pagesToTest = ['/index.html', '/windoor-v2.html'];

for (const pagePath of pagesToTest) {
  test.describe(`filterCatalogue on ${pagePath}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`http://localhost:8000${pagePath}`);
    });

    test('should show all items when "all" is selected', async ({ page }) => {
      // First, click a different category to hide some elements
      await page.click('button[data-cat="wpc"]');

      // Then click "all"
      await page.click('button[data-cat="all"]');

      // Verify all items are displayed
      const items = page.locator('.catalogue-item');
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        await expect(items.nth(i)).toBeVisible();
      }

      // Verify active classes on the button
      const allBtn = page.locator('button[data-cat="all"]');
      await expect(allBtn).toHaveClass(/active-tab/);
    });

    test('should show only WPC items and hide others', async ({ page }) => {
      await page.click('button[data-cat="wpc"]');

      const items = page.locator('.catalogue-item');
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const cat = await item.getAttribute('data-cat');
        if (cat === 'wpc') {
          await expect(item).toBeVisible();
        } else {
          await expect(item).toBeHidden();
        }
      }

      // Verify classes on wpc button
      const wpcBtn = page.locator('button[data-cat="wpc"]');
      await expect(wpcBtn).toHaveClass(/active-tab/);

      // Verify other buttons do not have active-tab
      const wfcBtn = page.locator('button[data-cat="wfc"]');
      await expect(wfcBtn).not.toHaveClass(/active-tab/);
    });

    test('should show only WFC items and hide others', async ({ page }) => {
      await page.click('button[data-cat="wfc"]');

      const items = page.locator('.catalogue-item');
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const cat = await item.getAttribute('data-cat');
        if (cat === 'wfc') {
          await expect(item).toBeVisible();
        } else {
          await expect(item).toBeHidden();
        }
      }
    });

    test('should show only PVC items and hide others', async ({ page }) => {
      await page.click('button[data-cat="pvc"]');

      const items = page.locator('.catalogue-item');
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const cat = await item.getAttribute('data-cat');
        if (cat === 'pvc') {
          await expect(item).toBeVisible();
        } else {
          await expect(item).toBeHidden();
        }
      }
    });

    test('should update button classes correctly', async ({ page }) => {
       await page.click('button[data-cat="wpc"]');
       const wpcBtn = page.locator('button[data-cat="wpc"]');
       await expect(wpcBtn).toHaveClass(/border-brand-gold\/40/);
       await expect(wpcBtn).toHaveClass(/text-brand-gold/);
       await expect(wpcBtn).toHaveClass(/bg-brand-gold\/10/);
       await expect(wpcBtn).not.toHaveClass(/border-slate-300/);

       const wfcBtn = page.locator('button[data-cat="wfc"]');
       await expect(wfcBtn).not.toHaveClass(/border-brand-gold\/40/);
       await expect(wfcBtn).toHaveClass(/border-slate-300/);
       await expect(wfcBtn).toHaveClass(/text-slate-600/);
       await expect(wfcBtn).toHaveClass(/bg-transparent/);
    });
  });
}
