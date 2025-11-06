/**
 * Calculates the factorial of a non-negative integer.
 * @param {number} n - The non-negative integer.
 * @returns {number} The factorial of n, or null if n is negative.
 */
function factorial(n) {
  if (n < 0) {
    return null;
  } else if (n === 0) {
    return 1;
  } else {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}

// Example usage:
// console.log(factorial(5)); // Output: 120
// console.log(factorial(0)); // Output: 1
// console.log(factorial(-1)); // Output: null