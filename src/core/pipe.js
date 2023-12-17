/**
 * Represents a pipe obstacle in the Flappy Bird game.
 * @class Pipe
 *
 * @property {p5.Vector} position - The current position of the pipe.
 * @property {p5.Vector} velocity - The current velocity of the pipe.
 * @property {boolean} active - Whether the pipe is currently active (i.e., on the screen).
 *
 */
class Pipe {
  /**
   * Creates a new Pipe object.
   *
   * @constructor
   * @param {number} x - The initial x-coordinate position of the pipe.
   */
  constructor(x) {
    // Position
    this.position = this.generatePosition(x);

    // Movement
    this.velocity = createVector(-2, 0);

    // Behaviour
    this.active = true;
  }

  /**
   * Creates a new Pipe object with a specified x-coordinate.
   * @static
   * @method Pipe#fromXCoordinate
   * @param {number} xCoordinate - The initial x-coordinate position of the pipe.
   * @returns {Pipe} - The newly created Pipe object.
   */
  static fromXCoordinate(xCoordinate) {
    return new Pipe(xCoordinate);
  }

  /**
   * Generates a new position for the pipe.
   * If x is provided, the pipe will be positioned at that x-coordinate.
   * Otherwise, the pipe will be positioned at the right edge of the canvas.
   * The y-coordinate is randomly generated within a specified range.
   * @method Pipe#generatePosition
   * @param {number} [x] - The x-coordinate position of the pipe.
   * @returns {p5.Vector} - The generated position of the pipe.
   */
  generatePosition(x) {
    return createVector(x || width, random(PIPE_OFFSET, height - PIPE_OFFSET));
  }

  /**
   * Changes the opening coordinates of the pipe.
   * The pipe's position will be updated with a new randomly generated y-coordinate within a specified range.
   * If x is provided, the pipe will be repositioned at that x-coordinate.
   * @method Pipe#changeOpeningCoordinates
   * @param {number} [x] - The x-coordinate position of the pipe.
   * @returns {void}
   */
  changeOpeningCoordinates(x) {
    this.position = this.generatePosition(x);
  }

  /**
   * Updates the position of the pipe based on its current velocity.
   * @method Pipe.update
   * @returns {void}
   */
  update() {
    this.position.add(this.velocity);
  }

  /**
   * Displays the pipe on the canvas. The pipe consists of two parts: a "top pipe"
   * that extends from the top of the screen to a random point, and a "bottom pipe"
   * that extends from a point spaced a certain distance below the top pipe to the
   * bottom of the screen. The space in between the top and bottom pipes is where
   * the bird can pass through.
   * @method Pipe#show
   * @returns {void}
   */
  show() {
    fill(...PIPE_DIM_GREY);

    // Top pipe
    rect(this.position.x, 0, this.width, this.position.y - this.spacing);

    // Bottom pipe
    rect(this.position.x, this.position.y + this.spacing, this.width, height);
  }

  /**
   * Deactivates the pipe.
   * @method Pipe#inactivate
   * @returns {void}
   */
  inactivate() {
    this.active = false;
  }

  /**
   * Retrieves the opening coordinates (top and bottom) of the pipe.
   * @method Pipe#toOpening
   * @returns {{top: number, bottom: number}} - The coordinates of the top and bottom openings.
   */
  toOpening() {
    return {
      top: this.position.y - this.spacing,
      right: this.rightEdge,
      bottom: this.position.y + this.spacing,
      left: this.leftEdge,
    };
  }

  /**
   * Checks if the pipe has moved offscreen to the left.
   * @method Pipe#isOffscreen
   * @returns {boolean} - True if the pipe is offscreen, otherwise false.
   */
  get isOffscreenLeft() {
    return this.rightEdge <= 0;
  }

  /**
   * Gets the x-coordinate of the pipe's center.
   * @method Pipe#x
   * @returns {number} - The x-coordinate of the pipe's center.
   */
  get x() {
    return this.position.x;
  }

  /**
   * Gets the right-edge x-coordinate of the pipe.
   * @method Pipe#rightEdge
   * @returns {number} - The right-edge x-coordinate of the pipe.
   */
  get rightEdge() {
    return this.x + this.width;
  }

  /**
   * Gets the left-edge x-coordinate of the pipe.
   * @method Pipe#leftEdge
   * @returns {number} - The left-edge x-coordinate of the pipe.
   */
  get leftEdge() {
    return this.x;
  }

  /**
   * Gets the width of the pipe.
   * @method Pipe#width
   * @returns {number} - The width of the pipe.
   */
  get width() {
    return PIPE_WIDTH * SCALE;
  }

  /**
   * Gets the spacing between the pipes.
   * @method Pipe#spacing
   * @returns {number} - The spacing between the pipes.
   */
  get spacing() {
    return PIPE_SPACING * SCALE;
  }
}
