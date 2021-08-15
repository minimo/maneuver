import {GameObject} from "@/phina/elements/GameObject";

export class Shot extends GameObject {
  constructor(options) {
    super(options);

    //基底クラス関連設定
    this.setSprite("particle", 16, 16);
    this.isGravity = false;

    /**
     * ショット寿命
     * @type {number}
     */
    this.lifeSpan = 60;
  }

  update() {
    if (this.time > this.lifeSpan) this.remove();
  }
}
