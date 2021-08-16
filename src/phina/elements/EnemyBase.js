import {GameObject} from "@/phina/elements/GameObject";

export class EnemyBase extends GameObject {
  constructor(options) {
    super(options);

    /**
     * オブジェクト属性
     * @type {string}
     */
    this.attribute = "enemy";

    /**
     * プレイヤーへの参照
     * @type {import('./Player').Player|null}
     */
    this.player = options.player;
  }
}