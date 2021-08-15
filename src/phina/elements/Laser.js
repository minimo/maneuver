import {GameObject} from "@/phina/elements/GameObject";
import {RectangleShape} from "phina.js";

export class Laser extends GameObject {

  constructor(options) {
    super(options);

    const rectOptions = {
      width: 3,
      height: 1000,
      fill: 'blue',
      stroke: 'blue',
      strokeWidth: 1,
      cornerRadius: 0,
    }
    this.sprite = new RectangleShape(rectOptions)
      .setPosition(0, -6)
      .setOrigin(0.5, 1.0)
      .addChildTo(this)

    //基底クラス関連設定
    this.isGravity = false;

    this.shooter = options.shooter;

    /**
     * ショット寿命
     * @type {number}
     */
    this.lifeSpan = 10;
  }

  update() {
    if (this.time > this.lifeSpan) this.remove();
    this.sprite.alpha -= 0.05;
    if (this.shooter) {
      this.setPosition(this.shooter.x, this.shooter.y);
    }
  }
}
