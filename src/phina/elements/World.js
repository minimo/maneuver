import {DisplayElement, MathEx, Random, RectangleShape} from "phina.js";
import {Player} from "@/phina/elements/Player";
import {LAYER, SCREEN} from "@/phina/app/Setting";
import {Shot} from "@/phina/elements/Shot";
import {Laser} from "@/phina/elements/Laser";
import {Decoy} from "@/phina/elements/Decoy";

export class World extends DisplayElement {
  constructor(options) {
    super(options);

    /**
     * 基底エレメント
     * @type {DisplayElement}
     */
    this.mapBase = new DisplayElement().setPosition(0, 0).addChildTo(this);

    /**
     * レイヤー
     * @type {DisplayElement[]}
     */
    this.mapLayer = [];
    for (let i = 0; i < LAYER.num; i++) {
      this.mapLayer[i] = new DisplayElement().addChildTo(this.mapBase);
    }


    /**
     * レイヤーアクセス簡略
     * @type {{effectForeground: DisplayElement, background: DisplayElement, effectBackground: DisplayElement, enemy: DisplayElement, map: DisplayElement, foreGround: DisplayElement, player: DisplayElement}}
     */
    this.layers = {
      foreGround: this.mapLayer[LAYER.foreGround],
      effectForeground: this.mapLayer[LAYER.effectForeground],
      player: this.mapLayer[LAYER.player],
      enemy: this.mapLayer[LAYER.enemy],
      effectBackground: this.mapLayer[LAYER.effectBackground],
      background: this.mapLayer[LAYER.background],
      map: this.mapLayer[LAYER.map],
    };

    /**
     * プレイヤーオブジェクト
     * @type {Player}
     */
    this.player = new Player({ world: this })
      .setPosition(SCREEN.width / 2, SCREEN.height / 2 - 100)
      .addChildTo(this.layers.player);

    /**
     * 重力係数
     * @type {number}
     */
    this.gravity = 0.1;

    /**
     * 経過フレーム
     * @type {number}
     */
    this.time = 0;

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
      }).addChildTo(this.layers.background);
    }
  }

  update() {
    //自機を画面中央にする
    this.mapBase.x = SCREEN.width / 2  - this.player.x - this.player.velocity.x * 3;
    this.mapBase.y = SCREEN.height / 2 - this.player.y - this.player.velocity.y * 3;

    if (this.time % 120 === 0) {
      this.enterDecoy(MathEx.randint(-100, 100), MathEx.randint(-1000, 1000));
    }

    //当たり判定チェック
    this.checkCollision();

    this.time++;
  }

  checkCollision() {
    // this.layers.enemy.children.forEach(e => {
    //   this.layers.player.children.forEach(p => {
    //   })
    // })
  }

  /**
   * ショットの投入
   * @param {import('./GameObject').GameObject} shooter
   */
  enterShot(shooter) {
    const shot = new Shot({world: this})
      .setPosition(shooter.x, shooter.y)
      .setVelocity(1, 0)
      .addChildTo(this.layers.player);
    const rad = MathEx.degToRad(shooter.angle * 22.5)
    shot.velocity.x += Math.sin(rad) * 30;
    shot.velocity.y += -Math.cos(rad) * 30;
  }

  /**
   * レーザーの投入
   * @param {import('./GameObject').GameObject} shooter
   */
  enterLaser(shooter) {
    const laser = new Laser({world: this, shooter})
      .setPosition(shooter.x, shooter.y)
      .setVelocity(1, 0)
      .addChildTo(this.layers.player);
    laser.rotation = shooter.angle * 22.5;
  }

  /**
   * ダミー敵の投入
   * @param {number} x
   * @param {number} y
   */
  enterDecoy(x, y) {
    new Decoy()
      .setPosition(x, y)
      .addChildTo(this.layers.enemy);
  }
}
