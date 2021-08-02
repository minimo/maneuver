import {DisplayScene} from "phina.js";
import {$safe} from "@/phina/extensions/Utils";
import {World} from "@/phina/elements/World";

export class MainScene extends DisplayScene {

  constructor(options) {
    super($safe.call({}, options, { backgroundColor: 'black' }));
    this.world = new World().addChildTo(this);
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}

}
