import {DisplayElement, RectangleShape} from "phina.js";

export class GameObject extends DisplayElement {
  constructor(options) {
    super(options);
    this.collision = new RectangleShape({ width: 16, height: 16 }).addChildTo(this);
    this.collision.alpha = 0.0;
    this.time = 0;
    this.on('enterframe', () => this.time++);
  }
}
