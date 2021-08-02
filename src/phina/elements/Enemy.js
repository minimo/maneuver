import {CircleShape, RectangleShape} from "phina.js";
import {$safe} from "@/phina/extensions/Utils";
import {GameObject} from "@/phina/elements/GameObject";

export class Enemy extends GameObject {
  constructor(options) {
    options = $safe.call({}, options, { width: 16, height: 16 });
    super(options);

    this.sprite = new CircleShape({ fill: 'blue', stroke: '#aaa', strokeWidth: 1, radius: 16 }).addChildTo(this);

    this.collision = new RectangleShape({ width: 16, height: 16 }).addChildTo(this);
    this.collision.alpha = 0.0;
  }

  /**
   * @virtual
   * 更新用仮想関数
   */
  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
