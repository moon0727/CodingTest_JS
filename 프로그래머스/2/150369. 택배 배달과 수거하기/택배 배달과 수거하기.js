function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    let deliver = 0;
    let pickup = 0;

    for (let i = n - 1; i >= 0; i--) {
        deliver += deliveries[i];
        pickup += pickups[i];

        while (deliver > 0 || pickup > 0) {
            deliver -= cap;
            pickup -= cap;
            answer += (i + 1) * 2;
        }
    }

    return answer;
}


//매번 배열 끝까지 순회해야함
// function solution(cap, n, deliveries, pickups) {
//     var answer = 0;
    
    
//     while(true) {
//         let deliver = cap
//         let pickup = cap

//         let move = 0
        
//         for(let i = n - 1; i >= 0; i--) {
//             if(deliver >= deliveries[i] && deliveries[i] !== 0) {
//                 deliver -= deliveries[i]
//                 deliveries[i] = 0
//                 if(move < i+1) {
//                     move = i+1
//                 }
//             }
        
//             if(pickup >= pickups[i] && pickups[i] !== 0) {
//                 pickup -= pickups[i]
//                 pickups[i] = 0
//                 if(move < i+1) {
//                     move = i+1
//                 }
//             }
//         }
        
//         answer += move * 2
        
//         if(deliveries.every(item => item === 0) && pickups.every(item => item === 0)) break;
//     }
    
    
//     return answer;
// }
