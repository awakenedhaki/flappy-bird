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
    this.OUTPUT_LAYER_ACTIVATION = "softmax";

    // Model Parameters
    this.nInputNodes = nInputNodes;
    this.nHiddenNodes = nHiddenNodes;
    this.nOutputNodes = nOutputNodes;

    // Set model
    this.model = brain || this.createModel();
  }

  /**
   * Creates a neural network model.
   * @method Brain#createModel
   * @returns {tf.Sequential} - Returns a sequential model.
   */
  createModel() {
    // Single layered NN
    return tf.sequential({
      layers: [
        // Fully connected hidden layer
        tf.layers.dense({
          units: this.nHiddenNodes,
          inputShape: [this.nInputNodes],
          activation: this.HIDDEN_LAYER_ACTIVATION,
        }),
        // Fully connected output layer
        tf.layers.dense({
          units: this.nOutputNodes,
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
      const weights = this.brain.getWeights();

      const mutatedWeights = weights.map((tensor) => {
        // Shape of tensor
        const shape = tensor.shape;

        // Synchronously download weight values
        const weights = tensor.dataSync();

        // Add gaussian noise to weights at given mutation rate
        const mutatedWeights = weights.map((weight) => {
          if (random(1) > rate) {
            weight += randomGaussian();
          } else {
            weight;
          }
        });

        return tf.tensor(mutatedWeights, shape);
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
    // Instantiate a new model
    const model = this.createModel(
      this.nInputNodes,
      this.nHiddenNodes,
      this.nOutputNodes
    );

    tf.tidy(() => {
      const weights = this.model.getWeights().map((weight) => tf.clone(weight));
      model.setWeights(weights);
    });

    return new Brain(
      this.nInputNodes,
      this.nHiddenNodes,
      this.nOutputNodes,
      model
    );
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
