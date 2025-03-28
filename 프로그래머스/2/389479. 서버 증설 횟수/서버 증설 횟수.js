function solution(players, m, k) {
    //증설 횟수 배열
    var answer = new Array(players.length).fill(0);
    //증설된 서버의 수 배열
    let server = new Array(players.length).fill(0);
    
    for(let i = 0; i < players.length; i++) {
        let serverCount = Math.floor(players[i] / m)
        
        //서버 증설 기준 : 필요한 server의 개수보다 설치된 server 개수가 작다면 추가
        if(serverCount > server[i]) {
            //증설 횟수 갱신
            answer[i] = serverCount - server[i]
            //증설된 서버의 수 갱신
            for(let j = i; j < Math.min(i+k, server.length); j++) {
                server[j] = server[j] + answer[i]
            }
        }
    }
    
    //answer array의 총합
    return answer.reduce((acc, cur) => acc + cur, 0);
}