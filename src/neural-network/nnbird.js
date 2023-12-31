/**
 * Represents a bird controlled by a neural network.
 * @class NNBird
 * @extends Bird
 *
 * @property {number} score - The score of the bird.
 * @property {number} fitness - The fitness of the bird, used for genetic algorithm selection.
 * @property {Brain} brain - The neural network controlling the bird.
 */
class NNBird extends Bird {
  /**
   * Constructs an NNBird object.
   * @constructor
   * @param {number} nInputNodes - Number of input nodes for the neural network.
   * @param {number} nHiddenNodes - Number of hidden nodes for the neural network.
   * @param {number} nOutputNodes - Number of output nodes for the neural network.
   * @param {Brain} [brain] - The neural network brain for the bird (optional).
   */
  constructor(nInputNodes, nHiddenNodes, nOutputNodes, brain) {
    super();
    this.score = 0;
    this.fitness = 0;

    // Instantiating single-layered neural network
    this.brain = brain || new Brain(nInputNodes, nHiddenNodes, nOutputNodes);
  }

  /**
   * Creates an NNBird object from an existing brain.
   * @method NNBird#fromBrain
   * @static
   * @param {Brain} brain - The neural network brain for the bird.
   * @returns {NNBird} - The newly created NNBird instance.
   */
  static fromBrain(brain) {
    return new NNBird(null, null, null, brain);
  }

  /**
   * Creates a copy of the NNBird with a new brain.
   * @method NNBird#copy
   * @returns {NNBird} - The copied NNBird instance.
   */
  copy() {
    return NNBird.fromBrain(this.brain.copy());
  }

  /**
   * Mutates the brain of the NNBird.
   * @method NNBird#mutate
   * @param {number} rate - The mutation rate for the brain.
   * @returns {void}
   */
  mutate(rate) {
    this.brain.mutate(rate);
  }

  /**
   * Makes a prediction based on inputs using the NNBird's brain and controls
   * the bird's action.
   * If the output of the neural network for a 'flap' action is greater than for
   * a 'do nothing' action, the bird will flap.
   * @method NNBird#predict
   * @param {Pipe} pipe - The pipe object for inputs.
   * @returns {void}
   */
  predict(pipe) {
    const pipeOpening = pipe.toOpening();

    const inputs = [
      // Bird Data
      this.position.y, // NNBird y-position
      this.velocity, // NNBird velocity
      // Pipe Data
      pipe.x, // Pipes x-coordinate
      pipeOpening.top, // Top pipe opening y-coordinate
      pipeOpening.bottom, // Bottom pipe opening y-coordinate
    ];

    const output = this.brain.predict(inputs);

    if (output[0] > output[1]) {
      this.flap();
    }
  }

  /**
   * Disposes the neural network bird by disposing its brain.
   * @returns {void}
   */
  dispose() {
    this.brain.dispose();
  }
}
