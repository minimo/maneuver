import {DisplayElement, MathEx, Random, RectangleShape} from "phina.js";
import {Player} from "@/phina/elements/Player";
import {LAYER, SCREEN} from "@/phina/app/Setting";
import {Shot} from "@/phina/elements/Shot";
import {Laser} from "@/phina/elements/Laser";

export class World extends DisplayElement {
  constructor(options) {
    super(options);
    this.setup();
  }

  /**
   * セットアップ
   */
  setup() {
    this.mapBase = new DisplayElement().setPosition(0, 0).addChildTo(this);

    //レイヤー構築
    this.mapLayer = [];
    for (let i = 0; i < LAYER.num; i++) {
      this.mapLayer[i] = new DisplayElement().addChildTo(this.mapBase);
    }

    this.player = new Player({ world: this })
        .setPosition(SCREEN.width / 2, SCREEN.height / 2 - 100)
        .addChildTo(this.mapLayer[LAYER.player]);

    this.setupMap();
  }

  /**
   * マップセットアップ
   */
  setupMap() {
    for (let i = 0; i < 1000; i++) {
      new RectangleShape({
        width: Random.randint(50, 200),
        height: Random.randint(50, 200),
        fill: 'blue',
        stroke: '#aaa',
        strokeWidth: 4,
        cornerRadius: 0,
        x: Random.randint(-10000, 10000),
        y: Random.randint(-5000, 5000),
      }).addChildTo(this.mapLayer[LAYER.background]);
    }
  }

  /**
   * ショットの投入
   * @param {Player} shooter
   */
  enterShot(shooter) {
    const shot = new Shot({world: this})
      .setPosition(shooter.x, shooter.y)
      .setVelocity(1, 0)
      .addChildTo(this.mapLayer[LAYER.player]);
    const rad = MathEx.degToRad(shooter.angle * 22.5)
    shot.velocity.x += Math.sin(rad) * 30;
    shot.velocity.y += -Math.cos(rad) * 30;
  }

  /**
   * レーザーの投入
   * @param shooter
   */
  enterLaser(shooter) {
    const laser = new Laser({world: this, shooter})
      .setPosition(shooter.x, shooter.y)
      .setVelocity(1, 0)
      .addChildTo(this.mapLayer[LAYER.player]);
    laser.rotation = shooter.angle * 22.5;
  }

  update() {
    //自機を画面中央にする
    this.mapBase.x = SCREEN.width / 2  - this.player.x - this.player.velocity.x * 3;
    this.mapBase.y = SCREEN.height / 2 - this.player.y - this.player.velocity.y * 3;
  }
}
