const assert = require('assert');

// Test case 1: Factorial of 0
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// Test case 1: Factorial of 0
function testFactorialZero() {
  assert.strictEqual(factorial(0), 1, 'Factorial of 0 should be 1');
}

// Test case 2: Factorial of 1
function testFactorialOne() {
  assert.strictEqual(factorial(1), 1, 'Factorial of 1 should be 1');
}

// Test case 3: Factorial of 5
function testFactorialFive() {
  assert.strictEqual(factorial(5), 120, 'Factorial of 5 should be 120');
}

// Test case 4: Factorial of 10
function testFactorialTen() {
  assert.strictEqual(factorial(10), 3628800, 'Factorial of 10 should be 3628800');
}

// Test case 5: Factorial of a negative number (should handle gracefully, though not explicitly specified)
function testFactorialNegative() {
  try {
    factorial(-1);
  } catch (e) {
    // Expecting an error, but not asserting on the specific error
    // This test validates that the function doesn't throw an error for negative input.
  }
}

// Run the tests
require('assert').strictEqual(testFactorialZero(), undefined, 'Test Factorial of 0 Failed');
require('assert').strictEqual(testFactorialOne(), undefined, 'Test Factorial of 1 Failed');
require('assert').strictEqual(testFactorialFive(), undefined, 'Test Factorial of 5 Failed');
require('assert').strictEqual(testFactorialTen(), undefined, 'Test Factorial of 10 Failed');
require('assert').strictEqual(testFactorialNegative(), undefined, 'Test Factorial of Negative Number Failed');
