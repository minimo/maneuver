import {LoadingScene, ManagerScene} from "phina.js";
import {AssetCatalog} from "@/phina/app/AssetCatalog";
import {GameTitleScene} from "@/phina/scenes/GameTitleScene";
import {MainScene} from "./MainScene";

export class SceneFlow extends ManagerScene {
  constructor() {
    super({
      startLabel: "loading",
      scenes: [{
        label: "loading",
        className: LoadingScene,
        nextLabel: "title",
        arguments: {
          assets: AssetCatalog.common,
        },
      },{
        label: "title",
        className: GameTitleScene,
        nextLabel: "main",
        arguments: {
          title: "MANEUVER"
        },
      },{
        label: "main",
        className: MainScene,
        nextLabel: "title",
      }],
    });
  }
}
