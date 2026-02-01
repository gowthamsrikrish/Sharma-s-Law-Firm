/**
 * Calculates the factorial of a non-negative integer.
 * @param {number} n - The non-negative integer.
 * @returns {number|Error} The factorial of n, or Error if input is invalid.
 */
function factorial(n) {
  // Input validation
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Use iterative approach to avoid stack overflow for large numbers
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

module.exports = factorial;