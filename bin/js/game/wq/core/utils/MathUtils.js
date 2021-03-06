/*
* 数值工具类;
*/
class MathUtils {
    static trueOrFalse() {
        return Math.random() >= 0.5;
    }
    /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
    static range(min, max) {
        return Math.random() * (max - min) + min;
    }
    /** 生成随机整数，随机整数范围包含min值和max值 */
    static rangeInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /** 判断num是否在某个区间（min, max），include不传参数的话，默认是含前含后，如需对前后包含情况做定义，请传include参数 */
    static within(num, min, max, include) {
        if (!include) {
            include = { min: true, max: true };
        }
        if (include.min === undefined) {
            include.min = true;
        }
        if (include.max === undefined) {
            include.max = true;
        }
        let biggerThanMin = false;
        if (include.min) {
            biggerThanMin = num >= min;
        }
        else {
            biggerThanMin = num > min;
        }
        if (biggerThanMin) {
            if (include.max) {
                return num <= max;
            }
            else {
                return num < max;
            }
        }
        else {
            return biggerThanMin;
        }
    }
    //计算两点角度
    static calulatePointAnagle(_startX, _startY, _endX, _endY) {
        //除数不能为0
        let tanAngle = Math.atan(Math.abs((_endY - _startY) / (_endX - _startX))) * 180 / Math.PI;
        if (_endX > _startX && _endY > _startY) { //第一象限
            tanAngle = -tanAngle;
        }
        else if (_endX > _startX && _endY < _startY) { //第二象限
            tanAngle = tanAngle;
        }
        else if (_endX < _startX && _endY > _startY) { //第三象限
            tanAngle = tanAngle - 180;
        }
        else {
            tanAngle = 180 - tanAngle;
        }
        return -tanAngle;
    }
    /** 计算旋转角度 */
    static computeAngle(nowPos, centPos) {
        let length = this.pointLegth(nowPos, centPos);
        //求弧度
        let radian = Math.asin(Math.abs(nowPos.y - centPos.y) / length);
        let angle = radian * 180 / Math.PI;
        //第一象限90-
        if ((centPos.x - nowPos.x) <= 0 && (centPos.y - nowPos.y) >= 0)
            angle = 90 - angle;
        //第二象限90+
        else if ((centPos.x - nowPos.x) <= 0 && (centPos.y - nowPos.y) <= 0)
            angle = angle + 90;
        //第三象限270-
        else if ((centPos.x - nowPos.x) >= 0 && (centPos.y - nowPos.y) <= 0)
            angle = 270 - angle;
        //第四象限270+
        else if ((centPos.x - nowPos.x) >= 0 && (centPos.y - nowPos.y) >= 0)
            angle = angle + 270;
        //偏移
        angle -= 360;
        return angle;
    }
    static pointLegth(nowPos, centPos) {
        return Math.sqrt(Math.pow((nowPos.x - centPos.x), 2) + Math.pow((nowPos.y - centPos.y), 2));
    }
    //字符串转数字
    static parseStringNum(_strNum) {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return intNum;
        }
        return 0;
    }
    //字符串转整形
    static parseInt(_strNum) {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    }
    //字符串转数字
    static numToPercent(_num) {
        let perNum = _num * 100;
        let intBit = Math.floor(perNum); //取整数部分
        if (perNum > intBit) {
            return perNum.toFixed(1) + "%";
        }
        return intBit + "%";
    }
    //单位转换
    static bytesToSize(bytes, isBlood = false) {
        if (bytes < 10000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0)
            return '0';
        var k = 1000, // or 1024
        sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'mm', 'nn', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'zz'], i = Math.floor(Math.log(bytes) / Math.log(k));
        var unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        }
        else {
            var numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        if (isBlood) {
            return Math.abs(parseInt((bytes / Math.pow(k, i)).toPrecision(3))) + unit;
        }
        else {
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
        }
    }
}
//# sourceMappingURL=MathUtils.js.map