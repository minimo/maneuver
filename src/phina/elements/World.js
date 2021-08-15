import {DisplayElement, Random, RectangleShape} from "phina.js";
import {Player} from "@/phina/elements/Player";
import {LAYER, SCREEN} from "@/phina/app/Setting";

export class World extends DisplayElement {
  constructor(options) {
    super(options);
    this.setup();
  }

  setup() {
    this.mapBase = new DisplayElement().setPosition(0, 0).addChildTo(this);

    //レイヤー構築
    this.mapLayer = [];
    for (let i = 0; i < LAYER.num; i++) {
      this.mapLayer[i] = new DisplayElement().addChildTo(this.mapBase);
    }

    this.player = new Player({ world: this })
        .setPosition(SCREEN.width / 2, SCREEN.height / 2 - 100)
        .addChildTo(this.mapLayer[LAYER.player]);

    this.setupMap();
  }

  setupMap() {
    for (let i = 0; i < 1000; i++) {
      new RectangleShape({
        width: Random.randint(50, 200),
        height: Random.randint(50, 200),
        fill: 'blue',
        stroke: '#aaa',
        strokeWidth: 4,
        cornerRadius: 0,
        x: Random.randint(-10000, 10000),
        y: Random.randint(-5000, 5000),
      }).addChildTo(this.mapLayer[LAYER.background]);
    }
  }
}
