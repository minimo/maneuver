import {GameObject} from "@/phina/elements/GameObject";
import {RectangleShape, Vector2} from "phina.js";

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
     * 前フレームの座標
     * @type {Vector2}
     */
    this.beforePosition = new Vector2();

    /**
     * 前フレームの角度
     * @type {number}
     */
    this.beforeRotation = 0;
  }

  update() {
    if (this.beforePosition.x === 0 && this.beforePosition.y === 0) {
      this.beforePosition.set(this.position.x, this.position.y);
      this.beforeRotation = this.rotation;
    }
    if (this.time > this.lifeSpan) this.remove();
    if (this.shooter) {
      this.setPosition(this.shooter.x, this.shooter.y);
      this.setRotation(this.shooter.angle * 22.5);
      this.afterImage();
    }
    this.beforePosition.set(this.position.x, this.position.y);
    this.beforeRotation = this.rotation;
  }

  afterImage() {
    if (!this.parent) return;
    const image = new RectangleShape(Laser.rectOptions)
      .setPosition(this.beforePosition.x, this.beforePosition.y)
      .setRotation(this.beforeRotation)
      .setOrigin(0.5, 1.0)
      .addChildTo(this.parent);
    image.lifeSpan = 5;
    image.on('enterframe', () => {
      image.lifeSpan--;
      image.alpha -= 0.2;
      if (image.lifeSpan < 0) image.remove();
    });
  }

  destroy() {
    this.sprite.canvas.width = 0;
    this.sprite.canvas.height = 0;
    this.sprite.remove();
    super.destroy();
  }
}
