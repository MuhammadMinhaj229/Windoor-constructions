const { test, expect } = require('@playwright/test');

const styleMetadata = {
    "teak-modern": {
        woodClass: "wood-teak-grain",
        panelsHTML: `<div class="w-full h-16 border border-black/30 bg-black/15 rounded shadow-sm"></div><div class="w-full h-28 border border-black/30 bg-black/15 rounded shadow-sm my-3"></div><div class="w-full h-16 border border-black/30 bg-black/15 rounded shadow-sm"></div>`,
        desc: "Teak Gold + S-13"
    },
    "charcoal-lines": {
        woodClass: "wood-charcoal-grain",
        panelsHTML: `<div class="w-full h-4 border-b border-black/40"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div>`,
        desc: "Charcoal Onyx + Lines"
    },
    "rose-classic": {
        woodClass: "wood-rose-grain",
        panelsHTML: `<div class="w-full h-24 border-2 border-black/20 bg-black/10 rounded-t-full flex items-center justify-center"><div class="w-8 h-8 border border-black/10 rounded-full"></div></div><div class="w-full h-16 border-2 border-black/20 bg-black/10 rounded mt-4"></div><div class="w-full h-16 border-2 border-black/20 bg-black/10 rounded mt-3"></div>`,
        desc: "Rosewood + S-106"
    },
    "ivory-clean": {
        woodClass: "wood-ivory-grain",
        panelsHTML: `<div class="w-full h-full border border-black/10 rounded-md flex items-center justify-center text-[10px] text-neutral-800 tracking-widest uppercase">Ivory Flat</div>`,
        desc: "Ivory Cream + Flat"
    }
};

const pagesToTest = ['index.html', 'windoor-v2.html'];

for (const pageName of pagesToTest) {
    test.describe(`syncCanvasSelections functionality on ${pageName}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`http://localhost:8000/${pageName}`);
            // Wait for the elements to be present
            await page.waitForSelector('#est-style');
            await page.waitForSelector('#render-door-body');
            await page.waitForSelector('#render-door-panels');
            await page.waitForSelector('#canvas-style-tag');
        });

        for (const [styleCode, metadata] of Object.entries(styleMetadata)) {
            test(`should correctly update DOM elements when ${styleCode} is selected`, async ({ page }) => {
                // Select the option
                await page.selectOption('#est-style', styleCode);

                // Check className of #render-door-body
                const doorBodyClass = await page.getAttribute('#render-door-body', 'class');
                expect(doorBodyClass).toContain(metadata.woodClass);
                expect(doorBodyClass).toContain('w-full h-full rounded-sm flex flex-col justify-between p-4 relative overflow-hidden transition-all duration-500 shadow-xl');

                // Check innerHTML of #render-door-panels
                const panelsInnerHTML = await page.innerHTML('#render-door-panels');
                // The browser might reformat HTML slightly, so we parse it or use string replacement if needed
                // But typically, innerHTML returns string that is mostly identical. We can just expect it.
                // We'll normalize whitespace just in case.
                const normalize = (str) => str.replace(/\s+/g, ' ').trim();
                expect(normalize(panelsInnerHTML)).toBe(normalize(metadata.panelsHTML));

                // Check innerText of #canvas-style-tag
                // Case matters due to CSS text-transform: uppercase (which innerText evaluates)
                const canvasTagText = await page.innerText('#canvas-style-tag');
                expect(canvasTagText.trim().toUpperCase()).toBe(metadata.desc.toUpperCase());
            });
        }
    });
}
