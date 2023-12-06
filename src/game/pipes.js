/**
 * Represents a collection of pipe obstacles in the Flappy Bird game.
 * @class Pipes
 *
 * @property {Pipe[]} pipes - An array of Pipe objects.
 * @property {number} DISTANCE_BETWEEN_PIPES - The distance between each pipe.
 * @property {number} MAX_PIPES - The maximum number of pipes.
 */
class Pipes {
  /**
   * Creates a new Pipes object.
   * @constructor
   */
  constructor() {
    // Constants
    this.DISTANCE_BETWEEN_PIPES = 180;
    this.MAX_PIPES = 4;

    // Collection
    this.pipes = this.initializePipeArray();
  }

  /**
   * Initializes the pipe array with the maximum number of pipes at their initial positions.
   * @method Pipes#initializePipeArray
   * @returns {Array<Pipe>} - Array containing the initialized pipes.
   */
  initializePipeArray() {
    const pipes = [];
    let x = width;
    for (let i = 0; i < this.MAX_PIPES; i++) {
      pipes[i] = Pipe.fromXCoordinate(x);
      x += this.DISTANCE_BETWEEN_PIPES;
    }
    return pipes;
  }

  /**
   * Spawns a new pipe if the maximum pipe count has not been reached.
   * @method Pipes#spawnPipe
   * @returns {void}
   */
  spawnPipe() {
    if (this.pipes.length < this.MAX_PIPES) {
      const newPipe = Pipe.fromXCoordinate(
        this.lastPipe.x + this.DISTANCE_BETWEEN_PIPES
      );
      this.pipes.push(newPipe);
    }
  }

  /**
   * Removes the first pipe in the array if it has moved offscreen.
   * @method Pipes#removePipe
   * @returns {void}
   *
   * @todo Recycle pipe instead of splicing
   */
  removePipe() {
    if (this.pipes.length === 0) return;

    if (this.firstPipe.isOffscreenLeft) {
      this.pipes.splice(0, 1);
    }
  }

  /**
   * Updates the positions of all pipes in the collection.
   * @method Pipes#update
   * @returns {void}
   */
  update() {
    this.pipes.forEach((pipe) => pipe.update());
  }

  /**
   * Displays all pipes in the collection on the canvas.
   * @method Pipes#show
   * @returns {void}
   */
  show() {
    this.pipes.forEach((pipe) => pipe.show());
  }

  /**
   * Gets the first pipe in the collection.
   * @method Pipes#firstPipe
   * @returns {Pipe} - The first pipe in the collection.
   */
  get firstPipe() {
    return this.pipes[0];
  }

  /**
   * Gets the last pipe in the collection.
   * @method Pipes#lastPipe
   * @returns {Pipe} - The last pipe in the collection.
   */
  get lastPipe() {
    return this.pipes[this.pipes.length - 1];
  }
}
