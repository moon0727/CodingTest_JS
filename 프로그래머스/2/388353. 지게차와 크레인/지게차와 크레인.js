function solution(storage, requests) {
    var answer = 0;
    
    let n = storage.length;  //행개수
    let m = storage[0].length;  //열개수
    
    //storage 위 아래 양 옆이 ''으로 채워진 배열 arr 생성
    let arr = Array.from({ length: n + 2 }, () => Array(m + 2).fill(''));
    
    //기존 배열을 가운데에 복사
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            arr[i + 1][j + 1] = storage[i][j];
        }
    }
    
    //request bfs
    for(let request of requests){
        bfs(arr, request, n + 2, m + 2)
    }

		//arr에 남은 알파벳 개수 출력
    for(let a of arr){
        answer += a.filter(v => v !== '').length;
    }
    return answer;
}

//위 아래 왼쪽 오른쪽 좌표
const dx = [0,0,-1,1];
const dy = [-1,1,0,0]


function bfs(arr, request, n, m){
	//방문한 컨테이너 확인용 array, false로 초기화
    let visit = Array.from({length : n}, () => Array.from({length : m}, () => false));
    
    visit[0][0] = true  //첫번째 노드 방문
    
    let queue = [[0,0]];  //queue에 넣기

    let history = new Set();  //제거할 좌표를 기록하는 용도

    while(queue.length > 0){  //큐에 남은 노드(컨테이너)가 있다면
        const [x, y] = queue.shift();  //FIFO 노드 빼기

        for(let i = 0; i < 4; i++){  //4방향 확인
            const nx = x + dx[i];
            const ny = y + dy[i];
           
			//존재하는 index + 방문한 적 없는 노드
            if(0 <= nx && nx < n && 0 <= ny && ny < m && !visit[nx][ny]){
                //request가 컨테이너의 알파벳과 동일하다면
                if(request[0] === arr[nx][ny]){
		            //좌표 저장
                    history.add([nx, ny]);
                }
                
                //str의 길이가 1이고(bfs 탐색이 필요함) 현재 노드가 빈 문자열을 가졌을 경우
                if(request.length === 1 && arr[nx][ny] === ''){
		            //방문 true
                    visit[nx][ny] = true;
                    queue.push([nx,ny])  //queue에 넣기
                } else if(request.length === 2){  //str의 길이가 2이면
                    //방문 true
                    visit[nx][ny] = true;
                    queue.push([nx,ny])  //queue에 넣기
                }
            }
        }
    }
    
    //좌표가 기록된 노드 알파벳 빼기
    history.forEach(([x, y]) => {
        arr[x][y] = '';
    });
}