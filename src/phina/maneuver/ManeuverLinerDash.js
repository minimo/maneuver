import {Tweener} from "phina.js";
import {ManeuverBase} from "@/phina/maneuver/ManeuverBase";

export class ManeuverLinerDash extends ManeuverBase {
  constructor(target) {
    super(target);
    this.tweener = null;
  }

  start() {
    if (this.tweener) return;
    this.tweener = new Tweener().play()
  }

  update() {
    //
  }
}
