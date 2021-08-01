import { Sprite } from "phina.js";
import { $safe } from "@/phina/extensions/Utils";
import { GameObject } from "@/phina/elements/GameObject";

export class Player extends GameObject {
  constructor(options) {
    options = $safe.call({}, options, { width: 32, height: 32 });
    super(options);
    this.sprite = new Sprite("fighter", 64, 64).addChildTo(this)
  }

  update() {
    this.time++;
  }
}
