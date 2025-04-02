//Binary Search
function solution(diffs, times, limit) {
    let left = 1;
    let right = diffs.reduce((acc, cur) => Math.max(acc, cur), 1);
    let level = 0;

    const canClear = (level) => {
        let timeSum = 0;
        for (let i = 0; i < diffs.length; i++) {
            if (diffs[i] <= level) { //내 숙련도로 한번에 풀 수 있는 난이도
                timeSum += times[i];
            } else { //내 숙련도보다 어려운 난이도
                let count = diffs[i] - level;
                timeSum += (times[i] + times[i - 1]) * count + times[i];
            }
            //시간 합이 limit을 넘기면 false
            if (timeSum > limit) return false;
        }
        //해당 level로 limit 시간 내에 퍼즐 클리어 가능
        return true;
    };

    //level이 1~diffs의 가장 큰 값으로 정렬되어있다고 여김
    //left <= right : 하나의 답으로 줄여지기 전까지 반복
    while (left <= right) {
        //중간값 찾기
        const mid = Math.floor((left + right) / 2);
        if (canClear(mid)) { //퍼즐을 풀 수 있다면 더 작은 값을 찾기
            level = mid;
            right = mid - 1;
        } else { //퍼즐을 풀 수 없다면 더 큰 값에서 찾기
            left = mid + 1;
        }
    }

    return level;
}

// 1~될때까지 하나씩 증가하며 탐색
// function solution(diffs, times, limit) {
//     let timeSum = 0;
//     let level = 1;
    
//     while(true) {
//         timeSum = 0;
        
//         for(let i = 0; i < diffs.length; i++) {
//             if(diffs[i] <= level) {
//                 timeSum += times[i]
//             } else if(diffs[i] > level) {
//                 let count = diffs[i] - level
//                 timeSum += (times[i] + times[i - 1]) * count + times[i]
//             }
            
//             if(limit < timeSum) {
//                 break;
//             }
            
//             if(i == diffs.length-1) {
//                 return level;
//             }
//         }
//         level++
//     }
    
//     return level;
// }