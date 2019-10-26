/**
 * @file  褐色滤镜
 * 公式： r = r * 0.393 + g * 0.769 + b * 0.189; g = r * 0.349 + g * 0.686 + b * 0.168; b = r * 0.272 + g * 0.534 + b * 0.131;
 */

/**
 * @description 褐色滤镜
 * @author chenjun
 * @export
 * @param {number[]} arr
 * @returns 
 */
export default function brown(arr: number[]) {
    let result = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        switch (i % 4) {
            case 0:
                result.push(
                    arr[i] * 0.393 + arr[i + 1] * 0.769 + arr[i + 2] * 0.189
                );
                break;
            case 1:
                result.push(
                    arr[i - 1] * 0.349 + arr[i] * 0.686 + arr[i + 1] * 0.168
                );
                break;
            case 2:
                result.push(
                    arr[i - 2] * 0.272 + arr[i - 1] * 0.534 + arr[i] * 0.131
                );
                break;
            default:
                result.push(arr[i]);
        }
    }

    return result;
}
