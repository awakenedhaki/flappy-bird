/**
 * Represents a population of birds controlled by neural networks.
 * @class Population
 *
 * @property {number} size - The size of the population.
 * @property {NNBird[]} activeBirds - The currently active birds in the population.
 * @property {NNBird[]} inactiveBirds - The birds that have been culled from the population.
 */
class Population {
  /**
   * Constructs a Population object.
   * @constructor
   * @param {number} size - The size of the population.
   * @param {NNBird[]} birds - The initial set of birds in the population (optional).
   */
  constructor(size, birds) {
    this.size = size || 5;
    this.activeBirds = birds || this.initializePopulation();
    this.inactiveBirds = [];
  }

  /**
   * Initializes the population with a set of birds.
   * @method Population#initializePopulation
   * @returns {NNBird[]} - The array of initialized birds in the population.
   */
  initializePopulation() {
    const birds = [];
    for (let i = 0; i < this.size; i++) {
      birds[i] = new NNBird(N_INPUT_NODES, N_HIDDEN_NODES, N_OUTPUT_NODES);
    }
    return birds;
  }

  /**
   * Creates a new generation of birds from the current population.
   * The new generation is created by selecting the fittest birds from the
   * current population and using them to breed a new set of birds.
   * @static
   * @method Population#nextGeneration
   * @param {NNBird[]} birds - The current population of birds.
   * @returns {Population} - A new population with the next generation of birds.
   */
  static nextGeneration(birds) {
    let weights = birds.map((bird) => {
      return bird.fitness;
    });

    const population = [];
    for (let i = 0; i < birds.length; i++) {
      population[i] = weightedRandomSelection(birds, weights).copy();
      population[i].mutate(MUTATION_RATE);
    }

    return new Population(birds.length, population);
  }

  /**
   * Calculates the fitness of each bird in the population.
   * @method Population#calculateFitness
   */
  calculateFitness() {
    const totalScore = this.inactiveBirds.reduce(
      (score, bird) => score + bird.score,
      0
    );

    for (let i = 0; i < this.inactiveBirds.length; i++) {
      const bird = this.inactiveBirds[i];
      bird.fitness = bird.score / totalScore;
    }
  }

  /**
   * Moves a bird from active to inactive in the population.
   * @method Population#cull
   * @param {number} index - The index of the bird to be moved to the inactive list.
   */
  cull(index) {
    this.inactiveBirds.push(...this.activeBirds.splice(index, 1));
  }

  /**
   * Executes a provided callback function for each active bird in the population.
   * @method Population#forEach
   * @param {Function} callback - The callback function to be executed for each active bird.
   */
  forEach(callback) {
    this.activeBirds.forEach(callback);
  }

  /**
   * Makes predictions for each active bird in the population based on the given pipe.
   * @method Population#predict
   * @param {Pipe} pipe - The pipe object for inputs.
   */
  predict(pipe) {
    this.activeBirds.forEach((bird) => bird.predict(pipe));
  }

  /**
   * Disposes the neural network brains of inactive birds in the population.
   * @method Population#dispose
   */
  dispose() {
    this.inactiveBirds.forEach((bird) => bird.brain.dispose());
  }

  /**
   * Updates each active bird in the population.
   * @method Population#update
   */
  update() {
    this.activeBirds.forEach((bird) => bird.update());
  }

  /**
   * Displays each active bird in the population.
   * @method Population#show
   */
  show() {
    this.activeBirds.forEach((bird) => bird.show());
  }
}
