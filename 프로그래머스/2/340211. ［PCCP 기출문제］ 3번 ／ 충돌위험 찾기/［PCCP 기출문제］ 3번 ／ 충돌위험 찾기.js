function solution(points, routes) {
    var answer = 0;
    
    //시간별로 어떤 좌표에 로봇이 몇 대 있었는지를 저장
    const visited = new Map(); //key: time, value: Map("행,열", count)
    
    for(const route of routes) {
        let time = 0;
        let [r, c] = points[route[0] - 1]; //route[0]은 출발 지점
        
        const startKey = `${r}, ${c}`;
        if (!visited.has(time)) {
            visited.set(time, new Map());
        }
        visited.get(time).set(startKey, (visited.get(time).get(startKey) || 0) + 1);
        
        for(let i = 1; i < route.length; i++) { //route가 여러개 일 경우 고려
            const [targetR, targetC] = points[route[i] - 1];
            
            //r(행) 먼저 이동
            while(r !== targetR) {
                r += r < targetR ? 1 : -1;
                time += 1;
                const key = `${r}, ${c}`;
                if(!visited.has(time)) {
                    visited.set(time, new Map());
                }
                visited.get(time).set(key, (visited.get(time).get(key) || 0) + 1);
            }
            
            //c(열) 이동
            while(c !== targetC) {
                c += c < targetC ? 1 : -1;
                time += 1;
                const key = `${r}, ${c}`;
                if(!visited.has(time)) {
                    visited.set(time, new Map());
                }
                visited.get(time).set(key, (visited.get(time).get(key) || 0) + 1);
            }
        }
    }
    
    for(const posMap of visited.values()) {
        for(const count of posMap.values()) {
            if(count >= 2) {
                answer += 1;
            }
        }
    }
    
    return answer;
}