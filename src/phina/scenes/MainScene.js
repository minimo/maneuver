import {$safe} from "@/phina/extensions/Utils";
import {World} from "@/phina/elements/World";
import {BaseScene} from "@/phina/scenes/BaseScene";
import {SCREEN} from "@/phina/app/Setting";

export class MainScene extends BaseScene {

  constructor(options) {
    super($safe.call({}, options, { width: SCREEN.width, height:SCREEN.height, backgroundColor: 'black' }));
    this.world = new World().addChildTo(this);
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}

}
