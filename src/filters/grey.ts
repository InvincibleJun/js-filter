/**
 * @description 灰度滤镜算法，取平均值法
 * @author chenjun
 * @export
 * @param {number[]} arr
 */
export default function grey(arr: number[]) {
    let result = [];
    for (let i = 0, l = arr.length; i < l; i += 4) {
        let average = (arr[i] + arr[i + 1] + arr[i + 2]) / 3;
        result.push(average, average, average, arr[i + 3]);
    }

    return result;
}
