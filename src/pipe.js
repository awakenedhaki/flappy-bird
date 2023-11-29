/**
 * Represents a pipe obstacle in the Flappy Bird game.
 * @class
 */
class Pipe {
  /**
   * Creates a new Pipe object.
   * @constructor
   */
  constructor() {
    // CONSTANTS
    this.DIM_GREY = [106, 112, 110, 190];
    this.OFFSET = 60;
    this.SPACING = 27;
    this.WIDTH = 25;

    // Position
    this.center = createVector(
      width,
      random(this.OFFSET, height - this.OFFSET)
    );

    // Movement
    this.velocity = createVector(-2, 0);

    // Behaviour
    this.active = true;
  }

  /**
   * Updates the position of the pipe.
   * @method Pipe#update
   * @returns {void}
   */
  update() {
    this.center.add(this.velocity);
  }

  /**
   * Displays the pipe on the screen.
   * @method Pipe#show
   * @returns {void}
   */
  show() {
    fill(...this.DIM_GREY);

    // Top pipe
    rect(this.center.x, 0, this.width, this.center.y - this.spacing);

    // Bottom pipe
    rect(this.center.x, this.center.y + this.spacing, this.width, height);
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
      top: this.center.y - this.spacing,
      bottom: this.center.y + this.spacing,
    };
  }

  /**
   * Gets the x-coordinate of the pipe's center.
   * @method Pipe#x
   * @returns {number} - The x-coordinate of the pipe's center.
   */
  get x() {
    return this.center.x;
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
