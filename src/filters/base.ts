/**
 * @description 底片滤镜算法
 * @author chenjun
 * @export
 * @param {number[]} arr
 * @returns 
 */
export default function (arr: number[]) {
    let result: number[] = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        result.push(i % 4 !== 3 ? 255 - arr[i] : arr[i]);
    }
    return result;
}
