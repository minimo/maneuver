import {GameObject} from "@/phina/elements/GameObject";
import {NumberEx, RectangleShape, Vector2} from "phina.js";

export class Laser extends GameObject {
  static rectOptions = {
    width: 3,
    height: 1000,
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 1,
    cornerRadius: 0,
  };

  constructor(options) {
    super(options);

    this.sprite = new RectangleShape(Laser.rectOptions)
      .setPosition(0, -6)
      .setOrigin(0.5, 1.0)
      .addChildTo(this)

    //基底クラス関連設定
    this.isGravity = false;
    this.attribute = "player-laser"

    /**
     * 撃った人
     * @type {GameObject|*}
     */
    this.shooter = options.shooter;

    /**
     * ショット寿命
     * @type {number}
     */
    this.lifeSpan = 10;

    /**
     * 残像
     * @type {RectangleShape[]}
     */
    this.afterImages = [];

    /**
     * 前フレーム位置
     * @type {Vector2|null}
     */
    this.beforePosition = null;

    /**
     * 前フレーム向き
     * @type {Number|null}
     */
    this.beforeRotation = null;
  }

  update() {
    if (this.time > this.lifeSpan) this.remove();
    if (this.shooter) {
      this.setPosition(this.shooter.x, this.shooter.y);
      this.setRotation(this.shooter.angle);

      if (this.beforePosition) {
        this.beforePosition.set(this.position.x, this.position.y);
      } else {
        this.beforePosition = new Vector2(this.position.x, this.position.y);
      }
      this.beforeRotation = this.rotation;
    }
  }

  setupAfterImage() {
    NumberEx.times.call(5, () => {
      const image = new RectangleShape(Laser.rectOptions)
        .setPosition(this.beforePosition.x, this.beforePosition.y)
        .setRotation(this.beforeRotation)
        .setOrigin(0.5, 1.0)
        .addChildTo(this.parent);
      this.afterImages.push(image);
    })
  }

  destroy() {
    this.sprite.canvas.width = 0;
    this.sprite.canvas.height = 0;
    this.sprite.remove();
    super.destroy();
  }
}
