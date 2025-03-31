function solution(info, n, m) {
    let minA = n; //가질 수 없는 minA값으로 초기화
    const memo = new Set(); //memo Set 생성

    //dfs로 탐색
    function dfs(index, aSum, bSum) {
        //탐색 노드를 key로 저장 후 memo
        const key = `${index},${aSum},${bSum}`;
        if (memo.has(key)) return;
        memo.add(key);

        //조건을 만족할 수 없는 info일 경우 return 
        if (aSum >= n || bSum >= m) return;

        //조건을 만족하며 마지막 노드에 방문했을 때 minA와 현재 aSum 중 최소값 return
        if (index === info.length) {
            if (aSum < n && bSum < m) {
                minA = Math.min(minA, aSum);
            }
            return;
        }

        //A 선택
        dfs(index + 1, aSum + info[index][0], bSum);
        //B 선택
        dfs(index + 1, aSum, bSum + info[index][1]);
    }

    dfs(0, 0, 0);

    return minA === n ? -1 : minA;
}

// function solution(info, n, m) {
//     let minA = n;

//     function dfs(index, aSum, bSum) {
//         if (index === info.length) {
//             if (aSum < n && bSum < m) {
//                 minA = Math.min(minA, aSum);
//             }
//             return;
//         }

//         if (aSum >= n || bSum >= m) {
//             return;
//         }
        
//         dfs(index + 1, aSum + info[index][0], bSum);

//         dfs(index + 1, aSum, bSum + info[index][1]);
//     }

//     dfs(0, 0, 0)
    
//     if(minA != n) {
//         return minA
//     } else {
//         return -1
//     }
// }