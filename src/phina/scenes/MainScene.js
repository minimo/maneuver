import {ObjectEx} from "phina.js";
import {World} from "@/phina/elements/World";
import {BaseScene} from "@/phina/scenes/BaseScene";
import {SCREEN} from "@/phina/app/Setting";

/**
 * メインシーン
 */
export class MainScene extends BaseScene {
  static defaults = {
    width: SCREEN.width,
    height:SCREEN.height,
    backgroundColor: 'black',
  };

  constructor(options) {
    options = ObjectEx.$safe.call({}, options, MainScene.defaults);
    super(options);

    /**
     * ワールド管理クラス
     * @type {World}
     */
    this.world = new World().addChildTo(this);
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}

}
