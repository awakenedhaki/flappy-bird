/**
 * Represents a pipe obstacle in the Flappy Bird game.
 * @class
 */
class Pipe {
  /**
   * Creates a new Pipe object.
   * @constructor
   */
  constructor(x) {
    // CONSTANTS
    this.DIM_GREY = [106, 112, 110, 190];
    this.OFFSET = 60;
    this.SPACING = 27;
    this.WIDTH = 25;

    // Position
    this.pipe = createVector(
      x || width,
      random(this.OFFSET, height - this.OFFSET)
    );

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
   * Updates the position of the pipe.
   * @method Pipe#update
   * @returns {void}
   */
  update() {
    this.pipe.add(this.velocity);
  }

  /**
   * Displays the pipe on the screen.
   * @method Pipe#show
   * @returns {void}
   */
  show() {
    fill(...this.DIM_GREY);

    // Top pipe
    rect(this.pipe.x, 0, this.width, this.pipe.y - this.spacing);

    // Bottom pipe
    rect(this.pipe.x, this.pipe.y + this.spacing, this.width, height);
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
      top: this.pipe.y - this.spacing,
      bottom: this.pipe.y + this.spacing,
    };
  }

  /**
   * Checks if the pipe has moved offscreen to the left.
   * @method Pipe#isOffscreen
   * @returns {boolean} - True if the pipe is offscreen, otherwise false.
   */
  get isOffscreen() {
    const rightEdge = this.x + this.width;
    return rightEdge <= 0;
  }

  /**
   * Gets the x-coordinate of the pipe's center.
   * @method Pipe#x
   * @returns {number} - The x-coordinate of the pipe's center.
   */
  get x() {
    return this.pipe.x;
  }

  /**
   * Gets the width of the pipe.
   * @method Pipe#width
   * @returns {number} - The width of the pipe.
   */
  get width() {
    return this.WIDTH * SCALE;
  }

  /**
   * Gets the spacing between the pipes.
   * @method Pipe#spacing
   * @returns {number} - The spacing between the pipes.
   */
  get spacing() {
    return this.SPACING * SCALE;
  }
}
