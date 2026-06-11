const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

function runTests(file) {
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html, { runScripts: "dangerously" });
    const window = dom.window;
    const document = window.document;

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`\nRunning tests on ${file}...`);
            let passed = 0;
            let failed = 0;

            function assertEq(expected, actual, msg) {
                if (expected === actual) {
                    console.log(`✅ PASS: ${msg}`);
                    passed++;
                } else {
                    console.error(`❌ FAIL: ${msg}`);
                    console.error(`   Expected: ${expected}`);
                    console.error(`   Actual:   ${actual}`);
                    failed++;
                }
            }

            // Test 1: Normal quantity
            document.getElementById('est-qty').value = "2";
            window.runQuoteCalculation();
            assertEq("₹12,000 – ₹14,400", document.getElementById('est-final-range').innerText, "Quantity 2 calculates correctly");

            // Test 2: Zero quantity
            document.getElementById('est-qty').value = "0";
            window.runQuoteCalculation();
            assertEq("₹6,000 – ₹7,200", document.getElementById('est-final-range').innerText, "Quantity 0 evaluates to minimum 1 unit cost");

            // Test 3: Negative quantity
            document.getElementById('est-qty').value = "-5";
            window.runQuoteCalculation();
            assertEq("₹6,000 – ₹7,200", document.getElementById('est-final-range').innerText, "Quantity -5 evaluates to minimum 1 unit cost");

            console.log(`Result: ${passed} passed, ${failed} failed.\n`);
            resolve(failed === 0);
        }, 100);
    });
}

async function main() {
    console.log("🧪 Starting Quote Calculator Tests...");
    const successIndex = await runTests('./index.html');
    const successV2 = await runTests('./windoor-v2.html');

    if (successIndex && successV2) {
        console.log("🎉 All tests passed successfully!");
        process.exit(0);
    } else {
        console.log("💥 Some tests failed.");
        process.exit(1);
    }
}

main();
