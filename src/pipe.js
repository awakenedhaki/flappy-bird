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
    this.WIDTH = 17;

    // Position
    this.center = createVector(
      width,
      random(this.OFFSET, height - this.OFFSET)
    );

    // Movement
    this.velocity = createVector(-2, 0);
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
