function solution(sequence, k) {
    var answer = []
    
    //누적합을 저장할 배열
    //prefix[i] === sequence[0] + sequencce[1] + ... + sequence[i-1]
    let prefix = [0]
    
    let maxL  = Infinity
    
    //prefix에 부분 수열의 합을 모두 저장
    sequence.forEach((num, i)=>{
        prefix.push(num + prefix[i])
    })

    //부분 수열의 시작과 끝을 가리키는 투 포인터
    let left = 0
    let right = 0
    
    while(left <= right) {
        //현재 구간의 합
        let sum = prefix[right] - prefix[left]
        
        //현재 구간의 합이 k일 경우
        if(sum === k) {
            //현재 수열의 길이
            let nowL = right - 1 - left
            
            //여태까지의 찾아낸 부분 수열의 길이보다 작다면 갱신 후 정답 index 저장
            if(maxL > nowL) {
                maxL = nowL
                answer = [left, right-1]
            }
        }
        
        //sum이 k보다 작으면 끝 인덱스 증가, k보다 크면 시작 인덱스 증가
        if(sum < k){
            right++
        } else left++
    }

    return answer;
}