// function solution(numbers) {
//     var answer = [];
    
//     for(let i = 0; i < numbers.length - 1; i++) {
//         for(let j = i + 1; j < numbers.length; j++) {
//             if(numbers[i] < numbers[j]) {
//                 answer.push(numbers[j])
//                 break
//             }
//             if(j === numbers.length - 1) {
//                 answer.push(-1)
//                 break
//             }
            
//         }
//     }
    
//     answer.push(-1)
//     return answer;
// }

function solution(numbers) {
    const answer = new Array(numbers.length).fill(-1);
    const stack = [];

    for (let i = 0; i < numbers.length; i++) {
        while (stack.length > 0 && numbers[stack[stack.length - 1]] < numbers[i]) {
            const idx = stack.pop();
            answer[idx] = numbers[i];
        }
        stack.push(i);
    }

    return answer;
}