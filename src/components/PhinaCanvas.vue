<template>
  <div id="phina-canvas-root">
    <canvas id="phina-canvas"></canvas>
  </div>
</template>

<script>
import { phina } from "phina.js/build/phina.esm";
import { SceneFlow } from "@/phina/scenes/SceneFlow"
import { MainApp } from "@/phina/app/MainApp"

export default {
  data() {
    return {
    }
  },
  beforeCreate() {
    phina.main(()=> {
      const appOption = {
        width: 960,
        height: 640,
        fps: 60,
        query: "#phina-canvas",
        parent: "phina-canvas-root",
        fit: false,
      };
      const app = new MainApp(appOption);
      app.replaceScene(new SceneFlow());
      app.run();
    });
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  #phina-canvas-root {
    width: 100%;
    height: 100%;
  }
</style>
