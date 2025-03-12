function solution(n, q, ans) {
    var answer = 0;
    
    var allCombinations = getCombinations([...Array(n).keys()].map(i => i + 1), 5);
    
    for(let i = 0; i < q.length; i++) {
        allCombinations = allCombinations.filter(code => countMatches(code, q[i]) === ans[i])
    }
    
    answer = allCombinations.length;
    return answer;
}

function getCombinations(arr, k) {
    if (k === 0) return [[]];
    if (arr.length === 0) return [];

    const [first, ...rest] = arr;
    const withFirst = getCombinations(rest, k - 1).map(comb => [first, ...comb]);
    const withoutFirst = getCombinations(rest, k);

    return withFirst.concat(withoutFirst);
}

function countMatches(code, guess) {
    return code.filter(num => guess.includes(num)).length;
}