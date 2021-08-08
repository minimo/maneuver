import {Accessory} from "phina.js";

export class ManeuverBase extends Accessory {
  constructor(target) {
    super(target);
  }

  /**
   * @virtual
   * 機動開始
   */
  start() {}

  update() {}
}
