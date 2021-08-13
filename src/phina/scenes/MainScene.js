import {ObjectEx} from "phina.js";
import {World} from "@/phina/elements/World";
import {BaseScene} from "@/phina/scenes/BaseScene";
import {SCREEN} from "@/phina/app/Setting";

export class MainScene extends BaseScene {

  constructor(options) {
    super(ObjectEx.$safe.call({}, options, { width: SCREEN.width, height:SCREEN.height, backgroundColor: 'black' }));
    this.world = new World().addChildTo(this);
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}

}
