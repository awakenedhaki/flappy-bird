/**
 * Bird class representing the player-controlled bird in the Flappy Bird game.
 * @class Bird
 */
class Bird {
  /**
   * Creates a new Bird object.
   * @param {number} y - The initial y-coordinate position of the bird.
   */
  constructor(y) {
    // CONSTANTS
    this.X_POSITION = 35;
    this.BORDER_OFFSET = 0.1;
    this.MINT_GREEN = [201, 237, 220, 190];
    this.RADIUS = 17;
    this.MAX_VELOCITY = 1.2;
    this.MIN_VELOCITY = 0;
    this.LIFT_DISTANCE = createVector(0, -25);

    // Position of Bird
    this.position = createVector(this.X_POSITION, height / 2);

    // Movement
    this.gravity = createVector(0, 0.25);
    this.velocity = createVector(0, 0);
  }

  /**
   * Causes the bird to perform a flap action, adjusting its position upwards.
   * @method Bird#flap
   */
  flap() {
    this.position.add(this.LIFT_DISTANCE);
  }

  /**
   * Updates the bird's position and velocity based on gravity and constraints.
   * @method Bird#update
   */
  update() {
    this.velocity.add(this.gravity);
    this.velocity.y = constrain(
      this.velocity.y,
      this.MIN_VELOCITY,
      this.MAX_VELOCITY
    );

    this.position.add(this.velocity);
    this.position.y = constrain(
      this.position.y,
      this.BORDER_OFFSET,
      height - this.BORDER_OFFSET
    );
  }

  /**
   * Displays the bird on the canvas.
   * @method Bird#show
   */
  show() {
    fill(this.MINT_GREEN);
    ellipse(this.position.x, this.position.y, this.radius);
  }

  /**
   * Gets the radius of the bird.
   * @method Bird#radius
   * @returns {number} - The radius of the bird.
   */
  get radius() {
    return this.RADIUS * SCALE;
  }
}
