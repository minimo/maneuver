import {CanvasApp, GamepadManager} from "phina.js"

export class MainApp extends CanvasApp {

  constructor(options) {
    super(options);
    if (options.parent) {
      this.parentDomElement = document.getElementById(options.parent);
      console.log("parentElement", this.parentDomElement);
      this.fitScreen();
    }
    //ゲームパッド管理
    this.gamepadManager = new GamepadManager();
    this.gamepad = this.gamepadManager.get(0);
    this.controller = {};

    //パッド情報を更新
    this.on('enterframe', () => this.updateController());
  }

  fitScreen(isEver) {
    isEver = isEver === undefined ? true : isEver;

    const _fitFunc = function() {
      const e = this.domElement;
      const s = e.style;
      
      s.position = "absolute";
      s.margin = "auto";
      s.left = "0px";
      s.top  = "0px";
      s.bottom = "0px";
      s.right = "0px";

      const parent = this.parentDomElement || window;
      const rateWidth = e.width / (parent.innerWidth || parent.clientWidth);
      const rateHeight= e.height / (parent.innerHeight || parent.clientHeight);
      const rate = e.height / e.width;
      const divWidth = parent.clientWidth;
      const divHeight = parent.clientHeight;
      
      if (rateWidth > rateHeight) {
        s.width  = Math.floor(divWidth) + "px";
        s.height = Math.floor(divWidth * rate) + "px";
      }
      else {
        s.width  = Math.floor(divHeight / rate)+"px";
        s.height = Math.floor(divHeight) + "px";
      }
    }.bind(this);
    
    // 一度実行しておく
    _fitFunc();

    // リサイズ時のリスナとして登録しておく
    if (isEver) {
      parent.addEventListener("resize", _fitFunc, false);
    }
  }

  updateController() {
    this.gamepadManager.update();
    const before = this.controller;
    before.before = null;

    const gp = this.gamepad;
    const kb = this.keyboard;
    const angle1 = gp.getKeyAngle();
    const angle2 = kb.getKeyAngle();
    this.controller = {
      angle: angle1 !== null? angle1: angle2,

      up: gp.getKey("up") || kb.getKey("up"),
      down: gp.getKey("down") || kb.getKey("down"),
      left: gp.getKey("left") || kb.getKey("left"),
      right: gp.getKey("right") || kb.getKey("right"),

      attack: gp.getKey("A") || kb.getKey("X"),
      jump:   gp.getKey("X") || kb.getKey("Z"),
      menu:   gp.getKey("start") || kb.getKey("escape"),

      a: gp.getKey("A") || kb.getKey("Z"),
      b: gp.getKey("B") || kb.getKey("X"),
      x: gp.getKey("X") || kb.getKey("C"),
      y: gp.getKey("Y") || kb.getKey("V"),

      ok: gp.getKey("A") || kb.getKey("Z") || kb.getKey("space") || kb.getKey("return"),
      cancel: gp.getKey("B") || kb.getKey("X") || kb.getKey("escape"),

      start: gp.getKey("start") || kb.getKey("return"),
      select: gp.getKey("select"),

      pause: gp.getKey("start") || kb.getKey("escape"),

      analog1: gp.getStickDirection(0),
      analog2: gp.getStickDirection(1),

      //前フレーム情報
      before: before,
    };
  }
}
