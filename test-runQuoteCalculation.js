const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const { expect } = require('chai');

// Ignore console errors from external scripts (like tailwind) not loading properly in jsdom
const virtualConsole = new VirtualConsole();

describe('runQuoteCalculation logic', function() {
    let window, document;

    async function setupDOM(filename) {
        const html = fs.readFileSync(`./${filename}`, 'utf8');
        const dom = new JSDOM(html, { runScripts: "dangerously", virtualConsole, url: "http://localhost" });
        window = dom.window;
        document = window.document;

        // Give it a tick to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const testFiles = ['index.html', 'windoor-v2.html'];

    testFiles.forEach(filename => {
        describe(`Tests for ${filename}`, function() {
            let estProduct, estThickness, estQty, estLock, finalRange;

            beforeEach(async function() {
                await setupDOM(filename);
                estProduct = document.getElementById('est-product');
                estThickness = document.getElementById('est-thickness');
                estQty = document.getElementById('est-qty');
                estLock = document.getElementById('est-lock');
                finalRange = document.getElementById('est-final-range');

                // Reset to defaults
                estProduct.value = "WPC Customized Door";
                window.updateEstProduct();
                estThickness.value = "30mm";
                estQty.value = "1";
                estLock.checked = true;
                window.runQuoteCalculation();
            });

            it('should calculate default parameters correctly', function() {
                expect(finalRange.innerText).to.equal('₹6,000 – ₹7,200');
            });

            it('should apply 0.9 multiplier for 25mm thickness', function() {
                estThickness.value = "25mm";
                window.runQuoteCalculation();
                expect(finalRange.innerText).to.equal('₹5,520 – ₹6,624');
            });

            it('should apply 1.15 multiplier for 35mm thickness', function() {
                estThickness.value = "35mm";
                window.runQuoteCalculation();
                expect(finalRange.innerText).to.equal('₹6,720 – ₹8,064');
            });

            it('should apply 1.3 multiplier for 40mm thickness', function() {
                estThickness.value = "40mm";
                window.runQuoteCalculation();
                expect(finalRange.innerText).to.equal('₹7,440 – ₹8,928');
            });

            it('should update calculation when product changes', function() {
                estProduct.value = "WFC Doors & Frames";
                window.updateEstProduct(); // sets currentProduct to "WFC Doors & Frames" (6500)
                // Default thickness is 30mm (1.0). 6500 + 1200 (lock) = 7700
                expect(finalRange.innerText).to.equal('₹7,700 – ₹9,240');
            });

            it('should multiply by quantity', function() {
                estQty.value = "5";
                window.runQuoteCalculation();
                // Default: 6000 * 5 = 30000
                expect(finalRange.innerText).to.equal('₹30,000 – ₹36,000');
            });

            it('should default quantity to 1 if input is invalid', function() {
                estQty.value = "invalid";
                window.runQuoteCalculation();
                expect(finalRange.innerText).to.equal('₹6,000 – ₹7,200');
            });

            it('should omit lock price when unchecked', function() {
                estLock.checked = false;
                window.runQuoteCalculation();
                // Default without lock: 4800
                expect(finalRange.innerText).to.equal('₹4,800 – ₹5,760');
            });

            it('should test a complex scenario with multiple variables changed', function() {
                estProduct.value = "PVC Designer Door"; // base = 4200
                window.updateEstProduct();
                estThickness.value = "40mm"; // mult = 1.3
                estQty.value = "3";
                estLock.checked = false; // no lock
                window.runQuoteCalculation();

                // 4200 * 1.3 = 5460
                // 5460 * 3 = 16380
                // 16380 * 1.2 = 19656
                expect(finalRange.innerText).to.equal('₹16,380 – ₹19,656');
            });
        });
    });
});
