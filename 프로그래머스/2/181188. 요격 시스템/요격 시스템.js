function solution(targets) {
    var answer = 0;
    let target = 0;
    
    //e(끝점) 기준으로 오름차순 정렬
    targets.sort((a, b) => a[1] - b[1]);

    for(let i = 0; i < targets.length; i++) {
        //현재 요격 미사일이 커버할 수 없는 새 폭격 미사일이 나오면 요격 후 target 재설정
        if(target <= targets[i][0]) {
            answer++;
            target = targets[i][1]
        }
    }
    
    return answer;
}