import {Sprite, Vector2} from "phina.js";

export class ParticleSprite extends Sprite {
  static = {
    // 初期スケール
    defaultScale: 1.0,
    // スケールダウンのスピード
    scaleDecay: 0.01,
  }

  constructor(options) {
    super("particle", 16, 16);

    this.blendMode = 'lighter';

    this.beginPosition = new Vector2();
    this.velocity = options.velocity || new Vector2(0, 0);
    this.scaleX = this.scaleY = options.scale || ParticleSprite.defaultScale;
    this.scaleDecay = options.scaleDecay || ParticleSprite.scaleDecay;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;
    this.scaleX -= this.scaleDecay;
    this.scaleY -= this.scaleDecay;

    if (this.scaleX < 0) this.remove();
  }

  setVelocity(x, y) {
    if (x instanceof Vector2) {
      this.velocity = x.clone();
      return this;
    }
    this.velocity.x = x;
    this.velocity.y = y;
    return this;
  }
}
