function solution(book_time) {
    
    //모든 시간을 분 단위로 변환하고, 종료 시간에 10분 추가
    book_time = book_time.map(([start, end]) => {
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        return [sh * 60 + sm, eh * 60 + em + 10]; // 종료 시간에 청소 10분 추가
    });
    
    //시작 시간 기준으로 정렬
    book_time.sort((a, b) => a[0] - b[0]);
    
    let rooms = [];

    
    //각 예약마다:
    for(let i = 0; i < book_time.length; i++) {
        const [start, end] = book_time[i];

        //현재 사용 중인 방들 중, 퇴실(청소 끝) 시간이 현재 시작 시간 이하인 방은 제거 (재사용 가능)
        if (rooms.length > 0 && rooms[0] <= start) {
            rooms.shift();
        }
        
        //현재 예약을 위해 새 방 추가
        rooms.push(end);

        //재정렬
        rooms.sort((a, b) => a - b);
    }
    
    //동시에 사용 중인 방 수의 최댓값이 = 필요한 방 수
    return rooms.length;
}