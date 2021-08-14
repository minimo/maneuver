import {DisplayScene, Keyboard, Label, ObjectEx} from "phina.js";

export class TitleScene extends DisplayScene {
  static defaults = {
    title: 'phina.js games',
    message: '',

    fontColor: 'white',
    backgroundColor: 'hsl(200, 80%, 64%)',
    backgroundImage: '',

    exitType: 'touch',
  };

  constructor(options) {
    options = ObjectEx.$safe.call({}, options, TitleScene.defaults);
    super(options);

    this.backgroundColor = options.backgroundColor;

    this.fromJSON({
      children: {
        titleLabel: {
          className: Label,
          arguments: {
            text: options.title,
            fill: options.fontColor,
            stroke: false,
            fontSize: 64,
          },
          x: this.gridX.center(),
          y: this.gridY.span(4),
        }
      }
    });

    if (options.exitType === 'touch') {
      this.fromJSON({
        children: {
          touchLabel: {
            className: Label,
            arguments: {
              text: "TOUCH OR SPACE",
              fill: options.fontColor,
              stroke: false,
              fontSize: 32,
            },
            x: this.gridX.center(),
            y: this.gridY.span(12),
          },
        },
      });
    }
  }

  update(_app) {
    if (_app.pointer.getPointingStart() || _app.keyboard.getKey(Keyboard.KEY_CODE["z"])) {
      this.exit();
    }
  }

}
