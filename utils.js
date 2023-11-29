function integerLinearSpace(start, stop, cardinality) {
  const linearSpace = [];
  const step = (stop - start) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) {
    linearSpace.push(start + step * i);
  }
  return linearSpace;
}
