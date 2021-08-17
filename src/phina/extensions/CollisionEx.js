import {Vector2} from "phina.js";

export class CollisionEx {
    /**
     * @method testLineLine
     * @static
     * 2つの線分が重なっているかどうかを判定します
     * 参考：http://www5d.biglobe.ne.jp/~tomoya03/shtml/algorithm/Intersection.htm
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
}