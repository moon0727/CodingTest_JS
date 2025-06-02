function solution(board) {
    var answer = 0;
    let start = 0;
    let end = 0;
    
    board = board.map(row => row.split(""));
    
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            if(board[i][j] === "R") {
                start = [i, j]
            }
            if(board[i][j] === "G") {
                end = [i, j]
            }
        }
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const visited = Array.from({length: board.length}, () => Array(board[0].length).fill(false))
    const queue = [[...start, 0]];
    visited[start[0]][start[1]] = true
    
    while (queue.length > 0) {
        const [y, x, moves] = queue.shift();
        
        if (y === end[0] && x === end[1]) return moves;

        for (const [dy, dx] of directions) {
            let ny = y;
            let nx = x;

            // 해당 방향으로 계속 이동
            while (true) {
                const nextY = ny + dy;
                const nextX = nx + dx;
                
                if (
                    nextY >= 0 && nextY < board.length &&
                    nextX >= 0 && nextX < board[0].length &&
                    board[nextY][nextX] !== 'D'
                ) {
                    ny = nextY;
                    nx = nextX;
                } else {
                    break;
                }
            }

            if (!visited[ny][nx]) {
                visited[ny][nx] = true;
                queue.push([ny, nx, moves + 1]);
            }
        }
    }
    return -1;
}