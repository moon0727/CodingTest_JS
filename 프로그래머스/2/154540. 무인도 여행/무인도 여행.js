//BFS
function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  const answer = [];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && maps[i][j] !== 'X') {
        let sum = 0;
        const queue = [[i, j]];
        visited[i][j] = true;

        while (queue.length) {
          const [x, y] = queue.shift();
          sum += Number(maps[x][y]);

          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (nx >= 0 && ny >= 0 && nx < n && ny < m) {
              if (!visited[nx][ny] && maps[nx][ny] !== 'X') {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
              }
            }
          }
        }

        answer.push(sum);
      }
    }
  }

  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}

//DFS
// function solution(maps) {
//   const n = maps.length;
//   const m = maps[0].length;
//   const visited = Array.from({ length: n }, () => Array(m).fill(false));
//   const answer = [];

//   const dx = [-1, 1, 0, 0];
//   const dy = [0, 0, -1, 1];

//   function dfs(x, y) {
//     visited[x][y] = true;
//     let sum = Number(maps[x][y]);

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];
//       if (nx >= 0 && ny >= 0 && nx < n && ny < m) {
//         if (!visited[nx][ny] && maps[nx][ny] !== 'X') {
//           sum += dfs(nx, ny);
//         }
//       }
//     }

//     return sum;
//   }

//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (!visited[i][j] && maps[i][j] !== 'X') {
//         const result = dfs(i, j);
//         answer.push(result);
//       }
//     }
//   }

//   return answer.length ? answer.sort((a, b) => a - b) : [-1];
// }