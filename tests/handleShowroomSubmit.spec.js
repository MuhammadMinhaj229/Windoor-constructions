const { test, expect } = require('@playwright/test');

test.describe('handleShowroomSubmit Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  for (const pageName of ['index.html', 'windoor-v2.html']) {
    test(`[${pageName}] Submits the form and opens WhatsApp`, async () => {
      await page.goto(`http://localhost:8000/${pageName}`);

      // Fill the form
      await page.fill('#contact-name', 'John Doe');
      await page.fill('#contact-phone', '1234567890');
      await page.fill('#contact-message', 'I need a door');

      // We need to re-eval the mock because addInitScript runs before navigation.
      // Let's do it right before clicking
      await page.evaluate(() => {
         window.openArgs = [];
         window.open = function(url, target) {
             window.openArgs.push({url, target});
         }
      });

      // Click submit
      await page.click('#contact-showroom-form button[type="submit"]');

      // Verify window.open was called
      const openArgs = await page.evaluate(() => window.openArgs);
      expect(openArgs.length).toBe(1);
      expect(openArgs[0].target).toBe('_blank');

      const expectedText = encodeURIComponent(`*NEW CONSULTATION REQUEST*\n\n*Name:* John Doe\n*Phone:* 1234567890\n*Details:* I need a door\n\n_Via Windoor Contact Form._`);
      expect(openArgs[0].url).toContain(`https://wa.me/919642585067?text=${expectedText}`);

      // Verify modal was shown
      const modalTitle = await page.textContent('#modal-title');
      const modalDesc = await page.textContent('#modal-desc');
      expect(modalTitle).toBe('Request Sent!');
      expect(modalDesc).toBe('Thank you John Doe! Your enquiry has been forwarded to our team. We\'ll call you at 1234567890 shortly.');

      // Verify form was reset
      const nameVal = await page.inputValue('#contact-name');
      expect(nameVal).toBe('');
    });
  }
});
