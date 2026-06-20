const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

// 1. Mock the DOM
const mockedElements = {};
global.document = {
    getElementById(id) {
        if (!mockedElements[id]) {
            mockedElements[id] = { value: '', checked: false, innerText: '' };
        }
        return mockedElements[id];
    },
    querySelectorAll() { return []; }
};
global.window = {
    onload: null
};

// 2. Extract and eval script from index.html
const html = fs.readFileSync('index.html', 'utf8');
const scriptContent = html.match(/<script>([\s\S]*?)<\/script>/g).pop().replace(/<\/?script>/g, '');
eval(scriptContent);

// 3. Tests
test('runQuoteCalculation - happy path 30mm without lock', () => {
    currentProduct = "WPC Customized Door"; // Base: 4800
    mockedElements['est-thickness'] = { value: "30mm" }; // mult: 1.0
    mockedElements['est-qty'] = { value: "1" };
    mockedElements['est-lock'] = { checked: false };
    mockedElements['est-final-range'] = { innerText: '' };

    runQuoteCalculation();

    assert.strictEqual(mockedElements['est-final-range'].innerText, '₹4,800 – ₹5,760');
});

test('runQuoteCalculation - 25mm thickness', () => {
    currentProduct = "WPC Customized Door"; // Base: 4800
    mockedElements['est-thickness'] = { value: "25mm" }; // mult: 0.9
    mockedElements['est-qty'] = { value: "1" };
    mockedElements['est-lock'] = { checked: false };

    runQuoteCalculation();

    assert.strictEqual(mockedElements['est-final-range'].innerText, '₹4,320 – ₹5,184');
});

test('runQuoteCalculation - 40mm thickness with lock and quantity 2', () => {
    currentProduct = "WPC Customized Door"; // Base: 4800
    mockedElements['est-thickness'] = { value: "40mm" }; // mult: 1.3
    mockedElements['est-qty'] = { value: "2" };
    mockedElements['est-lock'] = { checked: true };

    runQuoteCalculation();

    // perUnit = (4800 * 1.3) + 1200 = 6240 + 1200 = 7440
    // min = 7440 * 2 = 14880
    // max = 7440 * 1.2 * 2 = 17856
    assert.strictEqual(mockedElements['est-final-range'].innerText, '₹14,880 – ₹17,856');
});

test('runQuoteCalculation - default product base when not found', () => {
    currentProduct = "Unknown Product"; // defaults to 4800
    mockedElements['est-thickness'] = { value: "30mm" };
    mockedElements['est-qty'] = { value: "1" };
    mockedElements['est-lock'] = { checked: false };

    runQuoteCalculation();

    assert.strictEqual(mockedElements['est-final-range'].innerText, '₹4,800 – ₹5,760');
});

test('runQuoteCalculation - default quantity 1 on invalid input', () => {
    currentProduct = "WPC Customized Door";
    mockedElements['est-thickness'] = { value: "30mm" };
    mockedElements['est-qty'] = { value: "invalid" };
    mockedElements['est-lock'] = { checked: false };

    runQuoteCalculation();

    assert.strictEqual(mockedElements['est-final-range'].innerText, '₹4,800 – ₹5,760');
});
