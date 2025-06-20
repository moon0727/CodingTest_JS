function solution(board) {
    //O, X의 개수를 담을 변수
    let O = 0;
    let X = 0;
    
    //O, X 개수 count
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === 'O') {
                O++;
            }
            if(board[i][j] === 'X') {
                X++;
            }
        }
    }
    
    //좌표배열
    const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    
    //O가 이겼는지 확인
    let winO = lines.some(line =>
        line.every(([x, y]) => board[x][y] === 'O')
    );
        
    //X가 이겼는지 확인
    let winX = lines.some(line => 
        line.every(([x, y]) => board[x][y] === 'X')
    );
     
    // 1. 개수 유효성 : O가 선공이기 때문에 X보다 작거나 X+1보다 큰 건 불가능
    if (O < X || O > X + 1) return 0;

    // 2. 둘 다 승리 → 불가능
    if (winO && winX) return 0;

    // 3. O가 이겼으면 O === X + 1 이어야함
    if (winO && O !== X + 1) return 0;

    // 4. X가 이겼으면 O === X 이어야함
    if (winX && O !== X) return 0;
    
    return 1;
}