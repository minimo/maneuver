import {Circle, Collision, DisplayElement, Rect, Vector2} from "phina.js";

//エレメント同士の接触判定

export class CollisionEx {

  /**
   * @method testLineLine
   * @static
   * 2つの線分が重なっているかどうかを判定します
   * 参考：http://www5d.biglobe.ne.jp/~tomoya03/shtml/algorithm/Intersection.html
   *
   * ### Example
   *     p1 = new Vector2(100, 100);
   *     p2 = new Vector2(200, 200);
   *     p3 = new Vector2(150, 240);
   *     p4 = new Vector2(200, 100);
   * CollisionEx.testLineLine(p1, p2, p3, p4); // => true
   *
   * @param {Vector2} p1 線分1の端の座標
   * @param {Vector2} p2 線分1の端の座標
   * @param {Vector2} p3 線分2の端の座標
   * @param {Vector2} p4 線分2の端の座標
   * @return {Boolean} 線分1と線分2が重なっているかどうか
   */
  static testLineLine(p1, p2, p3, p4) {
    //同一ＸＹ軸上に乗ってる場合の誤判定回避
    if (p1.x === p2.x && p1.x === p3.x && p1.x === p4.x) {
      const min = Math.min(p1.y, p2.y);
      const max = Math.max(p1.y, p2.y);
      return min <= p3.y && p3.y <= max || min <= p4.y && p4.y <= max;
    }
    const a = (p1.x - p2.x) * (p3.y - p1.y) + (p1.y - p2.y) * (p1.x - p3.x);
    const b = (p1.x - p2.x) * (p4.y - p1.y) + (p1.y - p2.y) * (p1.x - p4.x);
    const c = (p3.x - p4.x) * (p1.y - p3.y) + (p3.y - p4.y) * (p3.x - p1.x);
    const d = (p3.x - p4.x) * (p2.y - p3.y) + (p3.y - p4.y) * (p3.x - p2.x);
    return a * b <= 0 && c * d <= 0;
  }

  /**
   * @method testRectLine
   * @static
   * 矩形と線分が重なっているかどうかを判定します
   *
   * ### Example
   *     rect = new Rect(120, 130, 40, 50);
   *     p1 = new Vector2(100, 100);
   *     p2 = new Vector2(200, 200);
   * Collision.testRectLine(rect, p1, p2); // => true
   *
   * @param {Rect} rect 矩形領域オブジェクト
   * @param {Vector2} p1 線分の端の座標
   * @param {Vector2} p2 線分の端の座標
   * @return {Boolean} 矩形と線分が重なっているかどうか
   */
  static testRectLine(rect, p1, p2) {
    //包含判定
    if (rect.left <= p1.x && p1.x <= rect.right && rect.top <= p1.y && p1.y <= rect.bottom ) return true;
    if (rect.left <= p2.x && p2.x <= rect.right && rect.top <= p2.y && p2.y <= rect.bottom ) return true;

    //矩形の４点
    const r1 = new Vector2(rect.left, rect.top);     //左上
    const r2 = new Vector2(rect.right, rect.top);    //右上
    const r3 = new Vector2(rect.right, rect.bottom); //右下
    const r4 = new Vector2(rect.left, rect.bottom);  //左下

    //矩形の４辺をなす線分との接触判定
    if (CollisionEx.testLineLine(p1, p2, r1, r2)) return true;
    if (CollisionEx.testLineLine(p1, p2, r2, r3)) return true;
    if (CollisionEx.testLineLine(p1, p2, r3, r4)) return true;
    if (CollisionEx.testLineLine(p1, p2, r1, r4)) return true;
    return false;
  }

  /**
   * 円と矩形の当たり判定
   * @param {Circle} circle
   * @param {Rect} rect
   * @returns {boolean}
   */
  static testCircleRect (circle, rect) {
    // まずは大きな矩形で判定(高速化)
    const bigRect = new Rect(rect.left - circle.radius, rect.top - circle.radius, rect.width + circle.radius * 2, rect.height + circle.radius * 2);
    if (bigRect.contains(circle.x, circle.y) === false) {
      return false;
    }

    // 2種類の矩形と衝突判定
    const r = new Rect(rect.left - circle.radius, rect.top, rect.width + circle.radius * 2, rect.height);
    if (r.contains(circle.x, circle.y)) {
      return true;
    }
    r.set(rect.left, rect.top - circle.radius, rect.width, rect.height + circle.radius * 2);
    if (r.contains(circle.x, circle.y)) {
      return true;
    }

    // 円と矩形の４点の判定
    const c = new Circle(circle.x, circle.y, circle.radius);
    // left top
    if (c.contains(rect.left, rect.top)) {
      return true;
    }
    // right top
    if (c.contains(rect.right, rect.top)) {
      return true;
    }
    // right bottom
    if (c.contains(rect.right, rect.bottom)) {
      return true;
    }
    // left bottom
    if (c.contains(rect.left, rect.bottom)) {
      return true;
    }

    return false;
  }

  static testRectCircle(rect, circle) {
    return this.testCircleRect(circle, rect);
  }

  /**
   *
   * @param {DisplayElement} elm1
   * @param {DisplayElement} elm2
   * @returns {*}
   */
  static isHitElement(elm1, elm2) {
    //自分とテスト対象をグローバルへ変換
    const p = elm1.globalToLocal(elm2);
    const target = new DisplayElement({width: elm2.width, height: elm2.height}).setPosition(p.x, p.y);

    if (elm1.boundingType === 'rect') {
      if (elm2.boundingType === 'rect') {
        return Collision.testRectRect(elm1, target);
      } else {
        return CollisionEx.testRectCircle(elm1, target);
      }
    } else {
      if (elm2.boundingType === 'rect') {
        return CollisionEx.testCircleRect(elm1, target);
      } else {
        return Collision.testCircleCircle(elm1, target);
      }
    }
  }
}