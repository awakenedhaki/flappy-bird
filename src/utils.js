/**
 * Selects an element randomly based on provided weights.
 * @function weightedRandomSelection
 * @param {any[]} elements - The array of elements to select from.
 * @param {number[]} weights - The array of weights corresponding to elements.
 * @returns {any|null} - Returns a randomly selected element or null if unsuccessful.
 */
function weightedRandomSelection(elements, weights) {
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  const randomValue = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < elements.length; i++) {
    cumulativeWeight += weights[i];
    if (randomValue <= cumulativeWeight) {
      return elements[i];
    }
  }
  return null;
}
