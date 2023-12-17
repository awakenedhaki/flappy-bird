/**
 * Represents a collection of pipe obstacles in the Flappy Bird game.
 * @class Pipes
 *
 * @property {Pipe[]} pipes - An array of Pipe objects.
 */
class Pipes {
  /**
   * Creates a new Pipes object.
   * @constructor
   */
  constructor() {
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
    for (let i = 0; i < MAX_PIPES; i++) {
      pipes[i] = Pipe.fromXCoordinate(x);
      x += DISTANCE_BETWEEN_PIPES;
    }
    return pipes;
  }

  /**
   * Recycles the first pipe in the pipes array if it is offscreen to the left.
   * Moves the recycled pipe to the end of the array.
   * @method Pipes#removePipe
   * @returns {void}
   */
  recyclePipe() {
    if (this.pipes.length === 0) return;

    if (this.firstPipe.isOffscreenLeft) {
      const firstPipe = this.pipes.shift();
      firstPipe.changeOpeningCoordinates(
        this.lastPipe.x + DISTANCE_BETWEEN_PIPES
      );
      this.pipes.push(firstPipe);
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
