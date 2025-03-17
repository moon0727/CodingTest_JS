function solution(n, q, ans) {
    var answer = 0;
    
    // 1부터 n까지의 숫자로 이루어진 배열에서 5개를 뽑는 모든 조합을 생성
    var allCombinations = getCombinations([...Array(n).keys()].map(i => i + 1), 5);
    
    // 주어진 조건 (q와 ans)을 만족하는 조합만 남김
    for(let i = 0; i < q.length; i++) {
        allCombinations = allCombinations.filter(code => countMatches(code, q[i]) === ans[i])
    }
    
    // 최종적으로 남은 조합의 개수를 반환
    answer = allCombinations.length;
    return answer;
}

function getCombinations(arr, k) {
    if (k === 0) return [[]]; // k가 0이면 빈 배열을 포함한 배열 반환
    if (arr.length === 0) return []; // 더 이상 선택할 원소가 없으면 빈 배열 반환

    const [first, ...rest] = arr; // 첫 번째 원소를 분리하고 나머지를 rest로 저장
    // 첫 번째 원소를 포함하는 경우의 조합
    const withFirst = getCombinations(rest, k - 1).map(comb => [first, ...comb]);
    // 첫 번째 원소를 포함하지 않는 경우의 조합
    const withoutFirst = getCombinations(rest, k);

    return withFirst.concat(withoutFirst); // 두 경우를 합쳐 반환
}

function countMatches(code, guess) {
    return code.filter(num => guess.includes(num)).length;
}