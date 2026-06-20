const { test, expect } = require('@playwright/test');

test.describe('WhatsApp Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the local page
    await page.goto('http://localhost:8000/index.html');

    // Mock window.open to track calls without actually opening new tabs
    await page.evaluate(() => {
      window.__openedUrls = [];
      window.__openedTargets = [];
      window.__openedFeatures = [];
      window.open = (url, target, features) => {
        window.__openedUrls.push(url);
        window.__openedTargets.push(target);
        window.__openedFeatures.push(features);
        return null; // Mock return value
      };
    });
  });

  test('forwardConfigurationToWhatsApp - Happy Path', async ({ page }) => {
    // Fill out the estimator form
    await page.fill('#cust-name', 'John Doe');
    await page.fill('#cust-phone', '9876543210');
    await page.selectOption('#est-product', 'WPC Customized Door');
    await page.selectOption('#est-style', 'teak-modern');
    await page.selectOption('#est-thickness', '30mm');
    await page.selectOption('#est-brand', 'Elegant Doors');
    await page.fill('#est-qty', '5');

    // Trigger the quote calculation to update the est-final-range
    await page.evaluate(() => runQuoteCalculation());

    // Get the calculated range to build expected string
    const range = await page.textContent('#est-final-range');

    // Trigger the function
    await page.evaluate(() => forwardConfigurationToWhatsApp());

    // Retrieve mocked data
    const openedUrls = await page.evaluate(() => window.__openedUrls);
    const openedTargets = await page.evaluate(() => window.__openedTargets);
    const openedFeatures = await page.evaluate(() => window.__openedFeatures);

    expect(openedUrls.length).toBe(1);

    // Parse the URL
    const url = new URL(openedUrls[0]);
    expect(url.origin + url.pathname).toBe('https://wa.me/919642585067');

    // Check message content
    const msg = decodeURIComponent(url.searchParams.get('text'));
    expect(msg).toContain('*Name/Firm:* John Doe');
    expect(msg).toContain('*Phone/Location:* 9876543210');
    expect(msg).toContain('*Product:* WPC Customized Door');
    expect(msg).toContain('*Quantity:* 5 pcs');
    expect(msg).toContain(`*Estimate Range:* ${range}`);

    // Verify security constraints
    expect(openedTargets[0]).toBe('_blank');
    expect(openedFeatures[0]).toBe('noopener,noreferrer');
  });

  test('forwardConfigurationToWhatsApp - Edge Case with Missing Optional Fields', async ({ page }) => {
    // Leave name and phone blank, trigger the function
    await page.fill('#cust-name', '  '); // Only spaces
    await page.fill('#cust-phone', '');

    // Trigger the quote calculation
    await page.evaluate(() => runQuoteCalculation());

    const range = await page.textContent('#est-final-range');

    // Trigger the function
    await page.evaluate(() => forwardConfigurationToWhatsApp());

    // Retrieve mocked data
    const openedUrls = await page.evaluate(() => window.__openedUrls);

    expect(openedUrls).toBeDefined();
    expect(openedUrls.length).toBe(1);

    const url = new URL(openedUrls[0]);
    const msg = decodeURIComponent(url.searchParams.get('text'));

    // Should use default values
    expect(msg).toContain('*Name/Firm:* Builder');
    expect(msg).toContain('*Phone/Location:* Not provided');
  });
});