function solution(picks, minerals) {
    let answer = 0;

    const fatigueTable = {
        dia: { diamond: 1, iron: 1, stone: 1 },
        iron: { diamond: 5, iron: 1, stone: 1 },
        stone: { diamond: 25, iron: 5, stone: 1 },
    };

    const totalPickCount = picks.reduce((a, b) => a + b, 0);

    // 광물을 5개씩 자르고, 곡괭이 수만큼만 자르기
    const chunks = Array.from({ length: Math.ceil(minerals.length / 5) }, (_, i) => minerals.slice(i * 5, i * 5 + 5)).slice(0, totalPickCount); // 곡괭이 수만큼만 캘 수 있음

    // 각 chunk에 점수 계산 (돌곡괭이 기준)
    const scoredChunks = chunks.map((chunk, i) => ({
        index: i,
        score: chunk.reduce((acc, m) => acc + (m === 'diamond' ? 25 : m === 'iron' ? 5 : 1), 0),
        minerals: chunk,
    }));

    // 점수 높은 순서대로 정렬
    scoredChunks.sort((a, b) => b.score - a.score);

    // 곡괭이를 점수 높은 chunk에 순서대로 배정
    const pickTypes = [];
    for (let i = 0; i < picks[0]; i++) pickTypes.push('dia');
    for (let i = 0; i < picks[1]; i++) pickTypes.push('iron');
    for (let i = 0; i < picks[2]; i++) pickTypes.push('stone');

    // 각 chunk에 어떤 곡괭이를 배정했는지 기록
    const assigned = new Array(chunks.length);
    for (let i = 0; i < scoredChunks.length && i < pickTypes.length; i++) {
        assigned[scoredChunks[i].index] = pickTypes[i];
    }

    // 순서대로 피로도 계산
    for (let i = 0; i < chunks.length; i++) {
        const tool = assigned[i];
        if (!tool) continue; // 곡괭이 배정 안 된 경우

        for (const m of chunks[i]) {
            answer += fatigueTable[tool][m];
        }
    }

    return answer;
}