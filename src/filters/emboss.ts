/**
 * @description 浮雕算法实现
 * @author chenjun
 * @export
 * @param {number[]} arr
 * @param {number} width
 * @param {number} height
 * @returns
 */
export default function emboss(arr: number[], width: number, height: number) {
    let result: number[] = [];
    for (let i = 0, l = arr.length; i < l; i += 4) {
        result.push(
            arr[i + 4] - arr[i] + 128,
            arr[i + 5] - arr[i + 1] + 128,
            arr[i + 6] - arr[i + 2] + 128,
            arr[i + 3]
        );
        // result.push(i % 4 !== 3 ? 255 - arr[i] : arr[i]);
    }
    return result;
}
