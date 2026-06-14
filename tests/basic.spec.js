const { test, expect } = require('@playwright/test');

test('Page loads without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:8000');
  await expect(page).toHaveTitle(/Windoor/);
  expect(errors).toHaveLength(0);
});
