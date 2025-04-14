function solution(land) {
    const n = land.length; // 행(row)의 개수
    const m = land[0].length; // 열(column)의 개수

    // 방문 여부를 기록할 2차원 배열
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    
    // 각 칸이 어떤 석유 덩어리(componentId)에 속하는지 기록하는 배열
    const componentMap = Array.from({ length: n }, () => Array(m).fill(-1));

    // 각 석유 덩어리의 크기 (componentId -> 크기)
    const componentSizes = {};

    // 각 열에 어떤 석유 덩어리들이 포함되어 있는지 기록 (col -> Set of componentId)
    const columnToComponents = {};

    let componentId = 0; // 석유 덩어리 고유 ID

    // 상, 하, 좌, 우 이동 방향
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // BFS를 통해 모든 석유 덩어리를 탐색
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            // 석유가 있고 아직 방문하지 않았다면 새 덩어리 시작
            if (land[y][x] === 1 && !visited[y][x]) {
                const queue = [[y, x]]; // BFS 큐
                visited[y][x] = true;
                componentMap[y][x] = componentId;

                let size = 1; // 현재 덩어리의 크기
                const cols = new Set([x]); // 이 덩어리가 차지하는 열들

                // BFS 시작
                while (queue.length > 0) {
                    const [cy, cx] = queue.shift();

                    for (const [dy, dx] of directions) {
                        const ny = cy + dy;
                        const nx = cx + dx;

                        // 범위 내 & 석유 있음 & 아직 방문 안 했으면
                        if (
                            ny >= 0 && ny < n &&
                            nx >= 0 && nx < m &&
                            !visited[ny][nx] &&
                            land[ny][nx] === 1
                        ) {
                            visited[ny][nx] = true;
                            componentMap[ny][nx] = componentId;
                            queue.push([ny, nx]);
                            size++;
                            cols.add(nx); // 해당 열 기록
                        }
                    }
                }

                // 이 덩어리의 크기 저장
                componentSizes[componentId] = size;

                // 이 덩어리가 포함된 모든 열에 등록
                for (const col of cols) {
                    if (!columnToComponents[col]) {
                        columnToComponents[col] = new Set();
                    }
                    columnToComponents[col].add(componentId);
                }

                componentId++; // 다음 덩어리 ID로 증가
            }
        }
    }

    // 시추관을 각 열에 설치해 최대 석유량 계산
    let maxOil = 0;

    for (let col = 0; col < m; col++) {
        let oil = 0;
        const components = columnToComponents[col] || new Set();

        // 이 열에 걸쳐 있는 덩어리들의 석유량 합산
        for (const id of components) {
            oil += componentSizes[id];
        }

        maxOil = Math.max(maxOil, oil);
    }

    return maxOil;
}