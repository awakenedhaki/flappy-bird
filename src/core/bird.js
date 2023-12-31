/**
 * Bird class representing the player-controlled bird in the Flappy Bird game.
 * @class Bird
 *
 * @property {p5.Vector} position - The current position of the bird.
 * @property {p5.Vector} gravity - The gravity applied to the bird.
 * @property {p5.Vector} velocity - The current velocity of the bird.
 * @property {p5.Vector} lift - The lift applied to the bird when it flaps.
 *
 * @todo Apply SCALE global constant to velocity of bird
 */
class Bird {
  /**
   * Creates a new Bird object.
   * @constructor
   *
   * @todo Apply SCALE global constant to velocity of bird
   */
  constructor() {
    // Position of Bird
    this.position = createVector(BIRD_X_POSITION, height / 2);

    // Movement
    this.gravity = createVector(0, 0.3);
    this.velocity = createVector(0, 0);
    this.lift = createVector(0, -10);
  }

  /**
   * Causes the bird to perform a flap action, adjusting its position upwards.
   * @method Bird#flap
   * @returns {void}
   * @todo Apply SCALE global constant to velocity of bird
   */
  flap() {
    this.velocity.set(0, 0);
    this.velocity.add(this.lift);
  }

  /**
   * Updates the bird's velocity and position. The bird's velocity is increased by the gravity,
   * then constrained to be within the minimum and maximum velocities. The bird's position is
   * then updated by adding the velocity, and is constrained to be within the screen boundaries.
   * @method Bird#update
   * @returns {void}
   */
  update() {
    this.velocity.add(this.gravity);
    this.velocity.y = constrain(
      this.velocity.y,
      BIRD_MIN_VELOCITY,
      BIRD_MAX_VELOCITY
    );

    this.position.add(this.velocity);
    this.position.y = constrain(this.position.y, BIRD_BORDER_OFFSET, height);
  }

  /**
   * Draws the bird as a filled ellipse on the canvas.
   * @method Bird#show
   * @returns {void}
   */
  show() {
    fill(BIRD_MINT_GREEN);
    ellipse(this.position.x, this.position.y, this.diameter);
  }

  /**
   * Converts the bird's position and size to a hit box for collision detection.
   * A hit box is a set of coordinates that represents the space occupied by the bird.
   * @method Bird#toHitBox
   * @returns {{top: number, right: number, bottom: number, left: number}} - The pixel coordinates of the bird's hit box.
   */
  toHitBox() {
    const hitBox = {
      top: this.position.y - this.radius,
      right: this.position.x + this.radius,
      bottom: this.position.y + this.radius,
      left: this.position.x - this.radius,
    };
    return hitBox;
  }

  /**
   * Gets the diameter of the bird, scaled by the global SCALE factor.
   * @method Bird#diameter
   * @returns {number} - The scaled diameter of the bird, in pixels.
   */
  get diameter() {
    return BIRD_DIAMETER * SCALE;
  }

  /**
   * Gets the radius of the bird, which is half the diameter.
   * This is useful for calculations involving the bird's position and size.
   * @method Bird#radius
   * @returns {number} - The radius of the bird, in pixels.
   */
  get radius() {
    return this.diameter / 2;
  }
}
