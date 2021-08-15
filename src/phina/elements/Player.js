import {MathEx, ObjectEx} from "phina.js";
import {GameObject} from "@/phina/elements/GameObject";
import {AfterBanner} from "@/phina/elements/AfterBanner";
import {LAYER, SCREEN} from "@/phina/app/Setting";

export class Player extends GameObject {
  constructor(options) {
    options = ObjectEx.$safe.call({}, options, { width: 32, height: 32 });
    super(options);

    this.setSprite("fighter", 32, 32);
    this.sprite.setFrameIndex(0);

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
     * プレイヤーが最後に操作してから経過したフレーム
     * @private
     * @type {number}
     */
    this.controlTimer = 0;
  }

  update(_app) {
    const rad = MathEx.degToRad(this.angle * 22.5)
    const x = -Math.sin(rad) * 8;
    const y = Math.cos(rad) * 8;
    for(let i = 0; i < 2; i++) {
      const px = afterBannerOffset[this.angle][i].x;
      const py = afterBannerOffset[this.angle][i].y;
      this.afterBanner[i].setOffset( x + px, y + py);
    }
    this.control(_app);
  }

  control(app) {
    const player = this;
    let ct = app.controller;
    const isControl = ct.up ? this.controlTimer > 6 : this.controlTimer > 3;
    if (isControl) {
      if (ct.left) {
        player.angle--;
        if (player.angle < 0) player.angle = 15;
        this.controlTimer = 0;
      } else if (ct.right) {
        player.angle++;
        if (player.angle > 15) player.angle = 0;
        this.controlTimer = 0;
      }
      player.sprite.setFrameIndex(player.angle);
    }
    if (ct.up) {
      player.accelerator += 0.002;
      if (player.accelerator > 1) player.accelerator = 1;
      const rad = MathEx.degToRad(player.angle * 22.5)
      player.velocity.x += Math.sin(rad) * player.accelerator;
      player.velocity.y += -Math.cos(rad) * player.accelerator;
      if (player.velocity.length > 2) {
        player.velocity.normalize();
        player.velocity.mul(2);
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
      player.afterBanner[1].enable().setVelocity(v);
    } else {
      player.afterBanner[0].disable();
      player.afterBanner[1].disable();
    }

    if (ct.a) {
      //
    }

    this.controlTimer++;

    //自機を画面中央にする
    this.world.mapBase.x = SCREEN.width / 2  - player.x - player.velocity.x * 3;
    this.world.mapBase.y = SCREEN.height / 2 - player.y - player.velocity.y * 3;
  }
}

const afterBannerOffset = [
  [ {x: -3, y:  0}, {x:  3, y:  0}, ], //  0 上

  [ {x: -4, y:  1}, {x:  1, y:  3}, ], //  1
  [ {x: -2, y:  0}, {x:  2, y:  2}, ], //  2
  [ {x: -3, y:  3}, {x:  0, y: -1}, ], //  3

  [ {x:  0, y:  0}, {x:  0, y:  0}, ], //  4 左

  [ {x: -3, y:  0}, {x:  3, y:  0}, ], //  5
  [ {x: -1, y:  0}, {x:  2, y:  1}, ], //  6
  [ {x: -3, y:  1}, {x:  3, y:  0}, ], //  7

  [ {x: -3, y:  0}, {x:  3, y:  0}, ], //  8 下

  [ {x: -3, y:  2}, {x:  3, y:  0}, ], //  9
  [ {x: -2, y:  2}, {x:  1, y: -2}, ], // 10
  [ {x: -3, y:  0}, {x:  3, y:  0}, ], // 11

  [ {x:  0, y:  0}, {x:  0, y:  0}, ], // 12 右

  [ {x: -3, y:  3}, {x:  0, y: -1}, ], // 13
  [ {x: -2, y:  2}, {x:  2, y:  1}, ], // 14
  [ {x: -3, y:  1}, {x:  3, y:  0}, ], // 15
];
