// グローバルに展開
phina.globalize();
// アセット
const ASSETS = {
  // 画像
  image: {
  },
};

const assetReady = () => {
  (360).times(t => {
    const ret = ('0000' + t).slice(-4);
    ASSETS.image[`${ret}`] = `assets/${ret}.png`;
  })
}
assetReady();

/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit({width: 1280, height: 1280});
    // 背景色
    this.backgroundColor = 'transparent';
    // Sprite
    let num = 0;
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (num > 359) continue;
        const ret = ('0000' + num).slice(-4);
        Sprite(ret).addChildTo(this).setPosition(x * 64 + 32, y * 64 + 32);
        num++;
      }
    }
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // MainScene から開始
    startLabel: 'main',
    // アセット読み込み
    assets: ASSETS,
    width: 1280,
    height: 1280,
    backgroundColor: 'transparent',
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});
