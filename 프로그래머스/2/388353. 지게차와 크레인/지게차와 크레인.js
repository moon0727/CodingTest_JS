// function solution(storage, requests) {
//     let n = storage.length;
//     let m = storage[0].length;
//     let grid = storage.map(row => row.split(""));
    
//     let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    
//     // 현재 컨테이너의 개수를 세는 함수
//     function countContainers() {
//         return grid.flat().filter(cell => cell !== ".").length;
//     }
    
//     // 크레인 출고: 모든 해당 컨테이너 제거
//     function removeCrane(containerType) {
//         for(let i = 0; i < n; i++) {
//             for(let j = 0; j < m; j++) {
//                 if(grid[i][j] === containerType) {
//                     grid[i][j] = "."
//                 }
//             }
//         }
//         //console.log(grid)
//     }

//     // 지게차 출고: 
//     function removeForklift(containerType) {
//         let queue = [];
//         let visited = Array.from({ length: n }, () => Array(m).fill(false));

            
//         function isConnectedToOutside(r, c) {
//             if(r === 0 || c === 0 || r === n - 1 || c === m - 1) return true;
            
//             for(let[dr, dc] of directions) {
//                 let nr = r + dr, nc = c + dc;
//                 if(nr >= 0 && nr < n && nc >= 0 && nc < m) {
//                     if(grid[nr][nc] === "." && !visited[nr][nc]) {
//                         return true;
//                     }
//                 }
//             }
            
//             return false;
//         }
        
//         let found = true;
//         while(found) {
//             found = false;
//             queue = [];
            
//             for(let i = 0; i < n; i++) {
//                 for(let j = 0; j < m; j++) {
//                     if(grid[i][j] === containerType && isConnectedToOutside(i, j)) {
//                         queue.push([i, j]);
//                         visited[i][j] = true;
//                     }
//                 }
//             }
            
//             while(queue.length > 0) {
//                 let [r, c] = queue.shift();
//                 grid[r][c] = ".";
//                 found = true;
                
//                 for(let [dr, dc] of directions) {
//                     let nr = r + dr, nc = c + dc;
//                     if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === containerType) {
//                         visited[nr][nc] = true;
//                     }
//                 }
//             }
//         }
//         //console.log(grid)
//     }
    
//     //요청 처리
//     for(let req of requests) {
//         let containerType = req[0];
//         if(req.length === 1) {
//             removeForklift(containerType);
//         } else {
//             removeCrane(containerType)
//         }
//     }
    
//     return countContainers();
// }
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
    
    //글자 하나씩 bfs
    for(let str of requests){
        bfs(arr, str, n + 2, m + 2)
    }

		//arr에 남은 알파벳 개수 출력
    for(let a of arr){
        answer += a.filter(v => v !== '').length;
    }
    return answer;
}

//위 아래 왼쪽 오른쪽
const dx = [0,0,-1,1];
const dy = [-1,1,0,0]


function bfs(arr, str, n, m){
		//방문한 컨테이너 확인용 array, false로 초기화
    let visit = Array.from({length : n}, () => Array.from({length : m}, () => false));
    
    visit[0][0] = true  //첫번째 노드 방문
    
    let queue = [[0,0]];  //queue에 넣기

    let history = {}

    while(queue.length > 0){  //큐에 남은 노드(컨테이너)가 있다면
        const [x,y] = queue.pop();  //노드 빼기

        for(let i = 0; i < 4; i++){  //4방향 확인
            const nx = x + dx[i];
            const ny = y + dy[i];
           
						//존재하는 index + 방문한 적 없는 노드
            if(0 <= nx && nx < n && 0 <= ny && ny < m && visit[nx][ny] === false){
                //request가 컨테이너의 알파벳과 동일하다면
                if(str[0] === arr[nx][ny]){
		                //문자열 키 생성
                    history[`${nx} ${ny}`] = 1
                }
                
                //str의 길이가 1이고(bfs 탐색이 필요함) 현재 노드가 빈 문자열을 가졌을 경우
                if(str.length === 1 && arr[nx][ny] === ''){
		                //방문 true
                    visit[nx][ny] = true;
                    queue.push([nx,ny])  //queue에 넣기
                } else if(str.length === 2){  //str의 길이가 2이면
                    //방문 true
                    visit[nx][ny] = true;
                    queue.push([nx,ny])  //queue에 넣기
                }
            }
        }
    }
    
    //저장해두었던 키 분해해서 알파벳 빼기
    for(let key in history) {
        const [x, y] = key.split(' ').map(Number);
        arr[x][y] = ''
    }
}