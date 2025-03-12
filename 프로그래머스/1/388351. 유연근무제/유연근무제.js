function solution(schedules, timelogs, startday) {
    var answer = 0
    
    schedules.map((baseline, i) => {
        //시작 요일이 일요일일 경우 맨 앞, 맨 뒤 출근 시각 빼기
        if(startday == 7) {
            timelogs[i].splice(0, 1)
            timelogs[i].splice(-1, 1)
        }
        //그 외의 요일은 뒤에서부터 index 계산해서 빼기
        else {
             timelogs[i].splice(-(startday + 1), 2)
        }
      
        //answer에 각 timelogs의 모든 요소가 조건을 만족하면 + 1, 아니면 그대로 두기
        answer = timelogs[i].every(time => (baselineSetting(baseline) >= time)) ? answer + 1 : answer
    })
    
    return answer;
}

//baselineSetting(기준시각) 분 + 10이 60을 넘을 때 한시간 흐르게, 분은 10으로 나눈 나머지로 설정
function baselineSetting(baseline) {
    var min = baseline % 100
    var hour = Math.floor(baseline / 100)
    
    if(min + 10 > 59) {
        return ((hour + 1) * 100)+ (min % 10)
    }
    
    return baseline + 10
}