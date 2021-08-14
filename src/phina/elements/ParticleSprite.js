import {Sprite, Vector2} from "phina.js";

export class ParticleSprite extends Sprite {
  static defaults = {
    //パーティクル形式
    type: "sphere",
    // 初期スケール
    scale: 1.0,
    // スケール減衰率
    scaleDecay: 0.92,
  };

  constructor(options) {
    super("particle", 16, 16);

    this.blendMode = 'lighter';
    const scale = options.scale || ParticleSprite.defaults.scale;
    this.scale.set(scale, scale);

    /** @type {Vector2} */
    this.velocity = options.velocity || new Vector2(0, 0);
    /** @type {number} */
    this.scaleDecay = options.scaleDecay || ParticleSprite.defaults.scaleDecay;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mul(0.99);
    this.scale.mul(this.scaleDecay);

    if (this.scale.x < 0.01 || this.scale.y < 0.01) this.remove();
  }

  /**
   * 速度を設定する
   * @param {number} x
   * @param {number} y
   * @returns {ParticleSprite}
   */
  setVelocity(x, y) {
    if (x instanceof Vector2) {
      this.velocity = x.clone();
      return this;
    }
    this.velocity.x = x;
    this.velocity.y = y;
    return this;
  }

  /**
   * 減衰率を設定する
   * @param {number} decay
   * @returns {ParticleSprite}
   */
  setDecay(decay) {
    this.scaleDecay = decay;
    return this;
  }
}
