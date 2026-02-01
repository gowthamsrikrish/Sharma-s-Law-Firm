const assert = require('assert');
const factorial = require('../src/factorial');

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

// Test case 5: Factorial of a negative number (should throw an error)
function testFactorialNegative() {
  assert.throws(() => factorial(-1), Error, 'Factorial of negative number should throw an error');
}

// Test case 6: Non-integer input (should throw an error)
function testNonIntegerInput() {
  assert.throws(() => factorial(3.5), Error, 'Factorial of non-integer should throw an error');
}

// Test case 7: String input (should throw an error)
function testStringInput() {
  assert.throws(() => factorial("5"), Error, 'Factorial of string should throw an error');
}

// Run the tests
try {
  testFactorialZero();
  console.log('✓ Test Factorial of 0 Passed');
  
  testFactorialOne();
  console.log('✓ Test Factorial of 1 Passed');
  
  testFactorialFive();
  console.log('✓ Test Factorial of 5 Passed');
  
  testFactorialTen();
  console.log('✓ Test Factorial of 10 Passed');
  
  testFactorialNegative();
  console.log('✓ Test Factorial of Negative Number Passed');
  
  testNonIntegerInput();
  console.log('✓ Test Non-Integer Input Passed');
  
  testStringInput();
  console.log('✓ Test String Input Passed');
  
  console.log('\nAll tests passed!');
} catch (error) {
  console.error('✗ Test failed:', error.message);
  process.exit(1);
}
