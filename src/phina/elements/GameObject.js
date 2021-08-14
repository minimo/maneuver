import {DisplayElement, ObjectEx, RectangleShape} from "phina.js";

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
     * 経過フレーム
     * @type {number}
     */
    this.time = 0;

    //タイマー更新
    this.on('enterframe', () => this.time++);
  }

  /**
   * @virtual
   * 更新用仮想関数
   */
  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
