import {ObjectEx, RectangleShape} from "phina.js";
import {EnemyBase} from "@/phina/elements/EnemyBase";

export class Decoy extends EnemyBase {
  constructor(options) {
    options = ObjectEx.$safe.call({}, options, { width: 32, height: 32, player: null })
    super(options);

    this.sprite = new RectangleShape({width: 32, height: 32, fill: 'red'}).addChildTo(this);

    this.isGravity = false;
  }

  update() {
    this.rotation++;
  }
}