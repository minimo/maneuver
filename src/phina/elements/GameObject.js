import {DisplayElement, ObjectEx, RectangleShape, Vector2} from "phina.js";

export class GameObject extends DisplayElement {
  static defaults = {
    /** @type {null|World} */
    world: null,
    /** @type {number} */
    width: 16,
    /** @type {number} */
    height: 16
  };

  constructor(options) {
    options = ObjectEx.$safe.call({}, options, GameObject.defaults);
    super(options);

    /**
     * 所属するWorldクラス
     * @type {World|null}
     */
    this.world = options.world;

    /**
     * 当たり判定ボックス
     * @type {RectangleShape}
     */
    this.collision = new RectangleShape({ width: options.width, height: options.height }).addChildTo(this);
    this.collision.alpha = 0.0;

    /**
     * 当たり判定有効フラグ
     * @type {boolean}
     */
    this.isCollision = true;

    /**
     * 重力影響フラグ
     * @type {boolean}
     */
    this.isGravity = true;

    /**
     * 速度係数
     * @type {number}
     */
    this.accelerator = 1;

    /**
     * 移動速度
     * @type {Vector2}
     */
    this.velocity = new Vector2(0, 0);

    /**
     * 経過フレーム
     * @type {number}
     */
    this.time = 0;

    //基本処理
    this.on('enterframe', () => {
      if (this.isGravity) this.velocity.y += 0.1;
      this.position.add(this.velocity);
      this.velocity.mul(0.99);
      this.time++;
    });
  }

  /**
   * @virtual
   * 更新用仮想関数
   */
  // eslint-disable-next-line no-unused-vars
  update(_app) {}

  /**
   * 速度を設定する
   * @param {number} x
   * @param {number} y
   * @returns {GameObject}
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
   * 当たり判定の縦横幅を設定
   * @param {number} width
   * @param {number} height
   * @returns {GameObject}
   */
  setCollision(width, height) {
    this.collision.width = width;
    this.collision.height = height;
    return this;
  }
}
