function solution(weights) {
    let answer = 0;
    let count = {};  // 등장 횟수를 저장할 객체

    const ratios = [[1, 1], [2, 3], [2, 4], [3, 2], [3, 4], [4, 2], [4, 3]];

    for (let w of weights) {
        for (let [a, b] of ratios) {
            let target = (w * a) / b;
            if (count[target]) {
                answer += count[target];
            }
        }
        count[w] = (count[w] || 0) + 1;
    }

    return answer;
}