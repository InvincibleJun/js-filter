interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
}

/**
 * @description 数组转为二维矩阵
 * @author chenjun
 * @param {number[]} pixes
 * @param {number} width
 * @param {number} height
 * @returns
 */
function arrayToRectAndRgb(pixes: number[], width: number, height: number) {
    // rgba 色彩整合
    let rgbLine: Rgba[] = Array.from(pixes).reduce(
        (prev: Rgba[], cur, index) => {
            let tmp = index % 4;
            switch (tmp) {
                case 1:
                    prev[prev.length - 1].g = cur;
                    break;
                case 2:
                    prev[prev.length - 1].b = cur;
                    break;
                case 3:
                    prev[prev.length - 1].a = cur;
                    break;
                default:
                    prev.push({ r: cur, g: 0, b: 0, a: 0 });

            }
            return prev;
        },
        []
    );

    let result: Rgba[][] = [];

    for (let i = 0, l = rgbLine.length; i < l; i++) {
        let line = Math.floor(i / width);

        if (result[line]) {
            result[line].push(rgbLine[i]);
        } else {
            result[line] = [rgbLine[i]];
        }
    }
    return result;
}

/**
 * @description 高斯矩阵点处理
 * @author chenjun
 * @param {Rgb[][]} rect
 * @param {number} y
 * @param {number} x
 * @param {number} boundaryY
 * @param {number} boundaryX
 * @param {number} blur
 * @returns
 */
function getGaussColors(
    rect: Rgba[][],
    y: number,
    x: number,
    boundaryY: number,
    boundaryX: number,
    blur: number
) {
    if (blur === 0) return rect[y][x];
    let maxX = x + blur > boundaryX ? boundaryX : x + blur;
    let minX = x - blur < 0 ? 0 : x - blur;
    let maxY = y + blur > boundaryY ? boundaryY : y + blur;
    let minY = y - blur < 0 ? 0 : y - blur;
    let rd = 0;
    let gd = 0;
    let bd = 0;
    let ad = 0;

    for (let i = minY, l = maxY; i <= l; i++) {
        for (let j = minX, m = maxX; j <= m; j++) {
            let { r, g, b, a } = rect[i][j];
            let xd = j - x;
            let yd = i - y;
            let rankWeight = gauss(xd, yd, blur);

            rd += Math.abs(rankWeight) * r;
            gd += Math.abs(rankWeight) * g;
            bd += Math.abs(rankWeight) * b;
            ad += Math.abs(rankWeight) * a;
        }
    }

    return {
        r: parseInt(<any>rd, 10),
        g: parseInt(<any>gd, 10),
        b: parseInt(<any>bd, 10),
        a: 255
    };
}

/**
 * @description
 * @author chenjun
 * @param {number} x
 * @param {number} y
 * @param {number} blur
 * @returns 
 */
function gauss(x: number, y: number, blur: number) {
    return (
        (1 / (2 * Math.PI * blur * blur)) *
        Math.E ** (-(x * x + y * y) / (2 * blur * blur))
    );
}

/**
 * @description 高斯模糊像素点处理
 * @author chenjun
 * @export
 * @param {number[]} pixes
 * @param {number} width
 * @param {number} height
 */
export default function(
    pixes: number[],
    width: number,
    height: number,
    blur: number
) {
    let rect = arrayToRectAndRgb(pixes, width, height);
    let r = [];
    for (let i = 0, l = rect.length; i < l; i++) {
        for (let j = 0, m = rect[i].length; j < m; j++) {
            let point = getGaussColors(rect, i, j, l - 1, m - 1, blur);
            r.push(point.r);
            r.push(point.g);
            r.push(point.b);
            r.push(point.a);
        }
    }

    return r;
}
