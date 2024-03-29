import {ObjectEx, Vector2} from "phina.js";
import {EnemyBase} from "@/phina/elements/EnemyBase";
import {AfterBanner} from "@/phina/elements/AfterBanner";
import {LAYER} from "@/phina/app/Setting";

export class EnemyFighter extends EnemyBase {
  constructor(options) {
    options = ObjectEx.$safe.call({}, options, { width: 32, height: 32, player: null })
    super(options);

    this.setSprite("fighter", 32, 32);

    /**
     * 方角
     * @type {number}
     */
    this.angle = 0;

    /**
     * 加速度
     * @type {number}
     */
    this.accelerator = 10;

    /**
     * アフターバーナー
     * @type {AfterBanner}
     */
    this.afterBanner = new AfterBanner()
      .setLayer(this.world.mapLayer[LAYER.effectBackground])
      .attachTo(this);
  }

  update() {
    if (!this.player) return;

    const toPlayer = new Vector2(this.player.x - this.x ,this.player.y - this.y)
    if (toPlayer.length() > 30) {
      //自分から見たプレイヤーの方角
      const r = Math.atan2(toPlayer.y, toPlayer.x);
      let d = (r.toDegree() + 90);
      if (d < 0) d += 360;
      if (d > 360) d -= 360;
      this.angle = Math.floor(d / 22.5);
      this.sprite.setFrameIndex(this.angle);
      this.velocity.add(new Vector2(Math.cos(r) * this.accelerator, Math.sin(r) * this.accelerator));
      this.velocity.normalize();
      this.velocity.mul(this.accelerator);
    }

    this.position.add(this.velocity);
  }
}