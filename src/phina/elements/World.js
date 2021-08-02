import {DisplayElement, Sprite} from "phina.js";
import {Player} from "@/phina/elements/Player";

export class World extends DisplayElement {
  constructor(options) {
    super(options);

    this.root = new DisplayElement().setPosition(0, 0).addChildTo(this);

    //バックグラウンド
    this.bg = new Sprite("background").setPosition(0, 0).addChildTo(this.root);

    this.backgroundLayer = new DisplayElement().addChildTo(this);
    this.objectLayer = new DisplayElement().addChildTo(this);
    this.foregroundLayer = new DisplayElement().addChildTo(this);

    this.player = new Player().addChildTo(this.objectLayer);
  }
  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
