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
    let n = storage.length;
    let m = storage[0].length
    let arr = Array.from({length:1},()=>Array.from({length:m+2},()=>''));
    for(let i =0; i < storage.length; i ++){
        let a = ['', ...storage[i], ''];
        arr.push(a)
    }
    arr.push(Array.from({length:m+2},()=>''));

    for(let str of requests){
        bfs(arr,str,n+2,m+2)
    }

    for(let a of arr){
        answer += a.filter(v => v !== '').length;
    }
    return answer;
}

const dx = [0,0,-1,1];
const dy = [-1,1,0,0]

function bfs(arr,str,n,m){
    let visit = Array.from({length:n},()=>Array.from({length:m},()=>false));
    visit[0][0] = true
    let q= [[0,0]];

    let his = {}

    while(q.length > 0){
        const [x,y] = q.pop();

        for(let i=0; i < 4; i++){
            const nx = x + dx[i];
            const ny = y + dy[i];

            if(0 <= nx && nx < n && 0 <= ny && ny < m && visit[nx][ny] === false){
                if(str[0] === arr[nx][ny]){
                    his[`${nx} ${ny}`] = 1
                    // his.set(`${nx} ${ny}`,1)
                }
                if(str.length === 1 && arr[nx][ny] === ''){
                    visit[nx][ny] = true;
                    q.push([nx,ny])
                }else if(str.length === 2){
                    visit[nx][ny] = true;
                    q.push([nx,ny])
                }
            }
        }
    }
    for(let key in his){
        const [x,y] = key.split(' ').map(Number);
        arr[x][y] = ''
    }
}