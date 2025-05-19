function solution(r1, r2) {
    let answer = 0;
    
    //x좌표를 1~r2까지 반복
    for (let x = 1; x <= r2; x++) {
        //반지름 r2인 바깥 원 안에 들어갈 수 있는 y의 최대값
        //x^2 + y^2 <= r2^2을 만족하는 y중 가장 큰 정수 y
        const maxY = Math.floor(Math.sqrt(r2*r2 - x*x));
        
        //반지름 r1인 작은 원 바깥에 있을 수 있는 y의 최소값
        //x^2 + y^2 >= r1^2을 만족하는 y중 가장 작은 정수 y
        const minY = Math.ceil(Math.sqrt(Math.max(0, r1*r1 - x*x)));
        
        //가능한 y값의 개수 누적
        answer += maxY - minY + 1;
    }
    
    //4사분면 고려하여 * 4
    return answer * 4;
}