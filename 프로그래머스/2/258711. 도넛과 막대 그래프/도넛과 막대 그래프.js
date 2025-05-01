function solution(edges) {
  const indegree = {};
  const outdegree = {};
  const graph = {};

  // 그래프 생성
  for (const [a, b] of edges) {
    outdegree[a] = (outdegree[a] || 0) + 1;
    indegree[b] = (indegree[b] || 0) + 1;
    if (!graph[a]) graph[a] = [];
    graph[a].push(b);
  }

  // 생성된 정점: inDegree가 0이면서 outDegree >= 2
  let createdNode = null;
  for (const node in outdegree) {
    if (!(node in indegree) && outdegree[node] >= 2) {
      createdNode = parseInt(node);
      break;
    }
  }

  const visited = new Set();
  let donut = 0, stick = 0, eight = 0;

  const bfs = (start) => {
    const queue = [start];
    const nodes = new Set();
    const edges = [];

    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      nodes.add(current);

      const neighbors = graph[current] || [];
      for (const next of neighbors) {
        edges.push([current, next]);
        if (!visited.has(next)) queue.push(next);
      }
    }

    const inDeg = {};
    const outDeg = {};
    for (const [from, to] of edges) {
      outDeg[from] = (outDeg[from] || 0) + 1;
      inDeg[to] = (inDeg[to] || 0) + 1;
    }

    const nodeCount = nodes.size;
    const edgeCount = edges.length;

    if (edgeCount === nodeCount) {
      donut += 1;
    } else if (edgeCount === nodeCount - 1) {
      stick += 1;
    } else {
      eight += 1;
    }
  };

  // 생성 노드에서 나가는 간선 기준으로 서브 그래프 분리
  for (const next of graph[createdNode]) {
    if (!visited.has(next)) {
      bfs(next);
    }
  }

  return [createdNode, donut, stick, eight];
}