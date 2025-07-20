function solution(storey) {
    let answer = 0;

    while (storey > 0) {
        let digit = storey % 10;
        let next = Math.floor(storey / 10) % 10;

        if (digit < 5 || (digit === 5 && next < 5)) {
            answer += digit;
        } else {
            answer += (10 - digit);
            storey += 10;
        }

        storey = Math.floor(storey / 10);
    }

    return answer;
}