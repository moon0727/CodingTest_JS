function solution(plans) {
    var answer = [];
    let stack = [];
    
    // "HH:MM" → 분으로 변환해서 배열의 두 번째 요소에 덮어쓰기
    // 소요시간 문자열에서 숫자로 타입 변환
    plans.forEach(item => {
        const [h, m] = item[1].split(':').map(Number);
        item[1] = h * 60 + m;
        item[2] = Number(item[2]);
    });

    // 시작 시간 기준으로 정렬 수행
    plans.sort((a, b) => a[1] - b[1]);
    
    for (let i = 0; i < plans.length - 1; i++) {
        //과목, 시작시간, 소요시간
        const [subject, startTime, duration] = plans[i];

        //다음 과목의 시작 시간
        const nextStartTime = plans[i + 1][1];

        //현재 과목의 종료시간
        const endTime = startTime + duration;

        //다음 과목의 시작 시간 - 현재 과목의 종료시간 => 양수면? ㄱㅊ, 음수면? 중단하고 다음 과목 해야해
        let remainTime = nextStartTime - endTime;

        //현재 과목 종료 시간이 다음 과목 시작 시간보다 작으면
        if (remainTime >= 0) {
            //현재 과제 완료
            answer.push(subject);

            //남은 시간 동안 스택에 있는 과제 처리
            while (remainTime > 0 && stack.length > 0) {
                const [prevSubject, prevRemain] = stack.pop();
                if (prevRemain <= remainTime) {
                    remainTime -= prevRemain;
                    answer.push(prevSubject);
                } else {
                    stack.push([prevSubject, prevRemain - remainTime]);
                    remainTime = 0;
                }
            }
        } else {
            // 과제 못 끝냄 => 남은 시간 저장하고 stack에 push
            stack.push([subject, duration - (nextStartTime - startTime)]);
            
        }
    }
    
    //마지막 과제는 무조건 끝냄
    answer.push(plans[plans.length - 1][0]);

    //stack 남은 거 처리 (LIFO)
    while (stack.length > 0) {
        answer.push(stack.pop()[0]);
    }
    
    return answer;
}


// science, 12:40 시작, 50분 소요
// music, 12:20 시작, 40분 소요
// history, 14:00 시작, 30분 소요
// computer, 12:30 시작, 100분 소요

// 12:20 music 시작
// 12:30 music 중단(30분 남음), computer 시작
// 12:40 computer 중단(90분 남음), science 시작
// 13:30 science 종료, computer 시작
// 14:00 computer 중단(60분 남음), history 시작
// 14:30 history 종료, computer 시작
// 15:30 computer 종료, music 시작
// 16:00 music 종료