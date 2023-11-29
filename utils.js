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
