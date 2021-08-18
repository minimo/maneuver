import {Accessory, Vector2} from "phina.js";
import {ParticleSprite} from "@/phina/elements/ParticleSprite";

export class AfterBanner extends Accessory {
  constructor(target) {
    super(target);

    /**
     * パーティクル起点のオフセット座標
     * @type {Vector2}
     */
    this.offset = new Vector2(0, 0);

    /**
     * 速度
     * @type {Vector2}
     */
    this.velocity = new Vector2(0, 0);

    /**
     * 表示フラグ
     * @type {boolean}
     */
    this.isDisable = true;

    /**
     * 前フレーム座標
     * @type {Vector2|null}
     */
    this.before = null;
  }

  /**
   * 所属レイヤーの設定
   * @param layer
   * @returns {AfterBanner}
   */
  setLayer(layer) {
    this.layer = layer;
    return this;
  }

  /**
   * 有効化
   * @returns {AfterBanner}
   */
  enable() {
    this.isDisable = false;
    return this;
  }

  /**
   * 無効化
   * @returns {AfterBanner}
   */
  disable() {
    this.isDisable = true;
    return this;
  }

  /**
   * オフセット座標の設定
   * @param {number} x
   * @param {number} y
   * @returns {AfterBanner}
   */
  setOffset(x, y) {
    if (x instanceof Vector2) {
      this.offset.set(x.x, x.y);
      return this;
    }
    this.offset.set(x, y);
    return this;
  }

  /**
   * 速度の設定
   * @param {number|Vector2} x
   * @param {number} y
   * @returns {AfterBanner}
   */
  setVelocity(x, y = undefined) {
    if (x instanceof Vector2) {
      this.velocity = x.clone().mul(-1);
      return this;
    }
    this.velocity.set(x, y);
    return this;
  }

  update() {
    if (this.isDisable) {
      this.before = null;
      return;
    }
    const target = this.target;
    const options = { scale: 0.3 };
    const pos = target.position.clone().add(this.offset);
    if (this.before) {
      const dis = target.position.distance(this.before);
      const numSplit = Math.max(Math.floor(dis / 3), 6);
      const unitSplit = (1 / numSplit);
      for (let i = 0; i < numSplit; i++) {
        const per = unitSplit * i;
        const pPos = new Vector2(pos.x * per + this.before.x * (1 - per), pos.y * per + this.before.y * (1 - per));
        new ParticleSprite(options).setPosition(pPos.x, pPos.y).addChildTo(this.layer);
      }
      this.before.set(pos.x, pos.y);
    } else {
      this.before = new Vector2(pos.x, pos.y);
    }
  }

}