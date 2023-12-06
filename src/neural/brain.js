/**
 * Represents a neural network model used for prediction and mutation.
 * @class Brain
 * @todo Implement crossover along with mutation
 */
class Brain {
  /**
   * Constructs a Brain object with given parameters.
   * @constructor
   * @param {number} nInputNodes - The number of input nodes in the neural network.
   * @param {number} nHiddenNodes - The number of hidden nodes in the neural network.
   * @param {number} nOutputNodes - The number of output nodes in the neural network.
   * @param {tf.Sequential} [brain] - An existing model (optional).
   */
  constructor(nInputNodes, nHiddenNodes, nOutputNodes, brain) {
    // Constants
    this.HIDDEN_LAYER_ACTIVATION = "sigmoid";
    this.OUTPUT_LAYER_ACTIVATION = "sigmoid";

    // Model Parameters
    this.nInputNodes = nInputNodes;
    this.nHiddenNodes = nHiddenNodes;
    this.nOutputNodes = nOutputNodes;

    // Set model
    this.model =
      brain || this.createModel(nInputNodes, nHiddenNodes, nOutputNodes);
  }

  /**
   * Creates a neural network model.
   * @method Brain#createModel
   * @returns {tf.Sequential} - Returns a sequential model.
   */
  createModel(nInputNodes, nHiddenNodes, nOutputNodes) {
    // Single layered NN
    return tf.sequential({
      layers: [
        // Fully connected hidden layer
        tf.layers.dense({
          units: nHiddenNodes,
          inputShape: [nInputNodes],
          activation: this.HIDDEN_LAYER_ACTIVATION,
          useBias: true,
        }),
        // Fully connected output layer
        tf.layers.dense({
          units: nOutputNodes,
          acivation: this.OUTPUT_LAYER_ACTIVATION,
        }),
      ],
    });
  }

  /**
   * Mutates the weights of the neural network model.
   * @method Brain#mutate
   * @param {number} rate - The rate of mutation for the weights.
   * @returns {void}
   */
  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = weights.map((tensor) => {
        // Create a tensor of random values with the same shape as `tensor`
        const randomGaussianTensor = tf.randomNormal(tensor.shape);

        // Create a tensor of booleans, where each value is true with probability `rate`
        const mutationMask = tf.randomUniform(tensor.shape).less(rate);

        // Add the random values to `tensor`, but only where `mutationMask` is true
        const mutatedTensor = tensor.add(
          randomGaussianTensor.mul(mutationMask)
        );

        return mutatedTensor;
      });
      // Update weights in model
      this.model.setWeights(mutatedWeights);
    });
  }

  /**
   * Predicts outputs based on given inputs using the neural network model.
   * @method Brain#predict
   * @param {number[]} inputs - The input values for prediction.
   * @returns {number[]} - Returns an array of predicted outputs.
   */
  predict(inputs) {
    return tf.tidy(() => {
      const output = this.model.predict(tf.tensor2d([inputs]));
      return output.dataSync();
    });
  }

  /**
   * Creates a copy of the neural network model.
   * @method Brain#copy
   * @returns {tf.Sequential} - Returns a copy of the neural network model.
   */
  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel(
        this.nInputNodes,
        this.nHiddenNodes,
        this.nOutputNodes
      );

      const weights = this.model
        .getWeights()
        .map((weights) => tf.clone(weights));

      modelCopy.setWeights(weights);

      return new Brain(
        this.nInputNodes,
        this.nHiddenNodes,
        this.nOutputNodes,
        modelCopy
      );
    });
  }

  /**
   * Disposes of the neural network model, releasing its resources.
   * @method Brain#dispose
   * @returns {void}
   */
  dispose() {
    this.model.dispose();
  }
}
