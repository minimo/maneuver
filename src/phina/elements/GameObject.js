import {DisplayElement, ObjectEx, RectangleShape, Sprite, Vector2} from "phina.js";

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
     * オブジェクト属性
     * @type {string}
     */
    this.attribute = "base";

    /**
     * 所属するWorldクラス
     * @type {World|null}
     */
    this.world = options.world;
    const collisionLayer = this.world ? this.world.layers.collision : this;

    /**
     * 表示スプライト
     * @protected
     * @type {Sprite|null}
     */
    this.sprite = null;

    /**
     * 当たり判定タイプ(rect|circle|line)
     * @type {*|string}
     */
    this.collisionType = options.collisionType || "rect";

    /**
     * 当たり判定ボックス
     * @type {DisplayElement}
     */
    this.collision = new DisplayElement({ width: options.width, height: options.height }).addChildTo(collisionLayer);
    this.collision.parentObject = this;

    /**
     * 当たり判定可視フラグ
     * @type {boolean}
     */
    this.isVisibleCollision = false;
    if (this.isVisibleCollision) {
      new RectangleShape({ width: options.width, height: options.height }).addChildTo(this.collision).setAlpha(0.3);
    }

    /**
     * 当たり判定有効フラグ
     * @type {boolean}
     */
    this.isEnableCollision = true;

    /**
     * 接触フラグ（毎フレーム事に外部更新される）
     * @type {boolean}
     */
    this.isHit = false;

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

      if (this.isGravity) {
        const gravity = this.world ? this.world.gravity : 0.1;
        this.velocity.y += gravity;
      }
      this.position.add(this.velocity);
      this.velocity.mul(0.99);
      this.collision.setPosition(this.position.x, this.position.y);
      this.time++;
    });

    //リムーブ処理
    this.on('removed', () => {
      this.destroy();
      this.collision.remove();
    });
  }

  /**
   * @virtual
   * 更新用仮想関数
   */
  // eslint-disable-next-line no-unused-vars
  update(_app) {}

  /**
   * 表示スプライトの設定
   * @param {string} image
   * @param {number} width
   * @param {number} height
   */
  setSprite(image, width = undefined, height = undefined) {
    if (this.sprite) this.image.remove();
    this.sprite = new Sprite(image, width, height).addChildTo(this);
    return this;
  }

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
   * 当たり判定タイプを設定
   * @param {string} type
   */
  setCollisionType(type) {
    this.collisionType = type;
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

  /**
   * オブジェクト破棄処理
   */
  destroy() {
    //
  }
}
