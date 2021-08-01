import { DisplayElement, DisplayScene } from "phina.js/build/phina.esm";
import { $safe } from "@/phina/extensions/Utils";

export class MainScene extends DisplayScene {

  constructor(options) {
    super($safe.call({}, options, { backgroundColor: 'black' }));

    //バックグラウンド
    // this.bg = new Sprite("background").addChildTo(this).setOrigin(0, 0);

    this.backgroundLayer = new DisplayElement().addChildTo(this);
    this.objectLayer = new DisplayElement().addChildTo(this);
    this.foregroundLayer = new DisplayElement().addChildTo(this);
  }

  update() {

  }

}
