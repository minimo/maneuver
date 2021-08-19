import {MathEx, ObjectEx} from "phina.js";
import {GameObject} from "@/phina/elements/GameObject";
import {AfterBanner} from "@/phina/elements/AfterBanner";
import {LAYER} from "@/phina/app/Setting";

export class Player extends GameObject {
  constructor(options) {
    options = ObjectEx.$safe.call({}, options, { width: 32, height: 32 });
    super(options);

    this.setSprite("fighter", 32, 32);
    this.sprite.setFrameIndex(0);

    /**
     * オブジェクト属性
     * @type {string}
     */
    this.attribute = "player";

    /**
     * 最大速度
     * @type {number}
     */
    this.maxVelocity = 1;

    /**
     * 自機が向いている方向
     * @type {number}
     */
    this.angle = 0;

    /**
     * アフターバーナー
     * @type {AfterBanner[]}
     */
    this.afterBanner = [];
    for(let i = 0; i < 2; i++) {
      this.afterBanner[i] = new AfterBanner()
        .setLayer(this.world.mapLayer[LAYER.effectBackground])
        .disable()
        .attachTo(this);
    }

    /**
     * ロール速度
     * @private
     * @type {number}
     */
    this.rollSpeed = 4;

    /**
     * プレイヤーが最後にショットを撃ってから経過したフレーム
     * @private
     * @type {number}
     */
    this.shotInterval = 0;
  }

  update(_app) {
    const rad = MathEx.degToRad(this.angle)
    const x = -Math.sin(rad) * 12;
    const y = Math.cos(rad) * 12;
    for(let i = 0; i < 2; i++) {
      this.afterBanner[i].setOffset(x, y);
    }
    this.control(_app);
  }

  control(app) {
    const player = this;
    const ct = app.controller;
    const rollSpeed = ct.up ? this.rollSpeed = 3 : this.rollSpeed = 4;
    if (ct.left) {
      player.angle -= rollSpeed;
      if (player.angle < 0) player.angle = 359;
      this.controlInterval = 0;
    } else if (ct.right) {
      player.angle += rollSpeed;
      if (player.angle > 359) player.angle = 0;
      this.controlInterval = 0;
    }
    player.sprite.setFrameIndex(player.angle);

    if (ct.up) {
      player.accelerator += 0.001;
      if (player.accelerator > 1) player.accelerator = 1;
      const rad = MathEx.degToRad(player.angle)
      player.velocity.x += Math.sin(rad) * player.accelerator;
      player.velocity.y += -Math.cos(rad) * player.accelerator;
      if (player.velocity.length > this.maxVelocity) {
        player.velocity.normalize();
        player.velocity.mul(this.maxVelocity);
      }
    } else {
      player.accelerator *= 0.98;
    }

    //下に落ちる
    player.isGravity = !ct.up;

    //アフターバーナー
    if (ct.up) {
      const v = player.velocity.clone().mul(-1)
      player.afterBanner[0].enable().setVelocity(v);
      // player.afterBanner[1].enable().setVelocity(v);
    } else {
      player.afterBanner[0].disable();
      // player.afterBanner[1].disable();
    }

    if (ct.a && this.shotInterval > 12) {
      this.world.enterShot(this);
      this.shotInterval = 0;
    }
    if (ct.b && this.shotInterval > 10) {
      this.world.enterLaser(this);
      this.shotInterval = 0;
    }

    this.controlInterval++;
    this.shotInterval++;
  }
}
