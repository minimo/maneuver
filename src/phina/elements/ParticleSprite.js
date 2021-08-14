import {ObjectEx, Sprite, Vector2} from "phina.js";

export class ParticleSprite extends Sprite {
  static defaults = {
    //パーティクル形式
    type: "sphere",
    // 初期スケール
    scale: 1.0,
    // スケール減衰率
    scaleDecay: 0.92,
    //ブレンドモード
    blendMode: "lighter",
    //寿命（フレーム数）
    lifeSpan: 100,
    //スプライト名
    sprite: {
      assetName: "particle",
      width: 16,
      height: 16,
    },
  };

  constructor(options) {
    options = ObjectEx.$safe.call({}, options, ParticleSprite.defaults)
    super(options.sprite.assetName, options.sprite.width, options.sprite.height);

    this.blendMode = options.blendMode || "lighter";

    const scale = options.scale;
    if (scale instanceof Vector2) {
      this.scale.set(scale.x, scale.y);
    } else {
      this.scale.set(scale, scale);
    }

    /**
     * 速度
     * @type {Vector2}
     */
    this.velocity = new Vector2(0, 0);

    /**
     * スケール減衰率
     * @type {Vector2}
     */
    this.scaleDecay = new Vector2(0.92, 0.92);
    this.setScaleDecay(options.scaleDecay);

    /**
     * 寿命（フレーム数）
     * ０または負数の場合は無限
     * @type {number}
     */
    this.lifeSpan = options.lifeSpan;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mul(0.99);
    this.scale.x *= this.scaleDecay.x;
    this.scale.y *= this.scaleDecay.y;
    if (this.scale.x < 0.01 || this.scale.y < 0.01) this.remove();

    this.lifeSpan--;
    if (this.lifeSpan === 0) this.remove();
  }

  /**
   * 速度を設定する
   * @param {number} x
   * @param {number} y
   * @returns {ParticleSprite}
   */
  setVelocity(x, y = undefined) {
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
   * @param {number|Vector2} decay
   * @returns {ParticleSprite}
   */
  setScaleDecay(decay) {
    if (decay instanceof Vector2) {
      this.scaleDecay.set(decay.x, decay.y);
    } else {
      this.scaleDecay.set(decay, decay);
    }
    return this;
  }
}
