function solution(maps) {
  const N = maps.length;
  const M = maps[0].length;
  const board = maps.map(row => row.split(''));

  let start, lever, exit;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 'S') start = [i, j];
      if (board[i][j] === 'L') lever = [i, j];
      if (board[i][j] === 'E') exit = [i, j];
    }
  }

  const bfs = (start, target) => {
    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    const queue = [[...start, 0]];
    visited[start[0]][start[1]] = true;

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length) {
      const [x, y, time] = queue.shift();
      if (board[x][y] === target) return time;

      for (const [dx, dy] of directions) {
        const [nx, ny] = [x + dx, y + dy];
        if (
          nx >= 0 && nx < N &&
          ny >= 0 && ny < M &&
          board[nx][ny] !== 'X' &&
          !visited[nx][ny]
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny, time + 1]);
        }
      }
    }

    return -1; // 도달 불가능
  };

  const toLever = bfs(start, 'L');
  if (toLever === -1) return -1;

  const toExit = bfs(lever, 'E');
  if (toExit === -1) return -1;

  return toLever + toExit;
}