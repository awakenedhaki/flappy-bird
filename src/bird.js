/**
 * Bird class representing the player-controlled bird in the Flappy Bird game.
 * @class Bird
 */
class Bird {
  /**
   * Creates a new Bird object.
   * @todo Apply SCALE global constant to velocity of bird
   */
  constructor() {
    // Constants
    this.X_POSITION = 35;
    this.BORDER_OFFSET = 0.1;
    this.MINT_GREEN = [201, 237, 220, 190];
    this.DIAMETER = 17;
    this.MAX_VELOCITY = 6;
    this.MIN_VELOCITY = -4;

    // Position of Bird
    this.position = createVector(this.X_POSITION, height / 2);

    // Movement
    this.gravity = createVector(0, 0.3);
    this.velocity = createVector(0, 0);
    this.lift = createVector(0, -10);
  }

  /**
   * Causes the bird to perform a flap action, adjusting its position upwards.
   * @method Bird#flap
   * @returns {void}
   */
  flap() {
    this.velocity.add(this.lift);
  }

  /**
   * Updates the bird's position and velocity based on gravity and constraints.
   * @method Bird#update
   * @returns {void}
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
   * @returns {void}
   */
  show() {
    fill(this.MINT_GREEN);
    ellipse(this.position.x, this.position.y, this.diameter);
  }

  /**
   * Converts the bird's position and size to a hit box for collision detection.
   * @method Bird#toHitBox
   * @returns {{top: number, right: number, bottom: number, left: number}} - The coordinates of the bird's hit box.
   */
  toHitBox() {
    const hitBox = {
      top: bird.position.y - bird.radius,
      right: bird.position.x + bird.radius,
      bottom: bird.position.y + bird.radius,
      left: bird.position.x - bird.radius,
    };
    return hitBox;
  }

  /**
   * Gets the radius of the bird.
   * @method Bird#radius
   * @returns {number} - The radius of the bird.
   */
  get diameter() {
    return this.DIAMETER * SCALE;
  }

  /**
   * Gets the radius of the bird.
   * @method Bird#radius
   * @returns {number} - The radius of the bird.
   */
  get radius() {
    return this.diameter / 2;
  }
}
