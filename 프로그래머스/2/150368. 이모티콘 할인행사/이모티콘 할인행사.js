function solution(users, emoticons) {
    //할인율 조합
    let permutations = discountPermutation(emoticons.length)
    
    let maxPlusUsers = 0;
    let maxPrice = 0;

    //할인율 조합에 따른 매출과 플러스 가입자 계산
    for(let discounts of permutations) {
        let plusUsers = 0;
        let price = 0;
        
        for(let [userRate, userPrice] of users) {
            let total = 0;
            
            for(let i = 0; i < emoticons.length; i++) {
                if(discounts[i] >= userRate) {
                    let discountedPrice = emoticons[i] * (100 - discounts[i]) / 100;
                    total += discountedPrice;
                }
            }
                
            if(total >= userPrice) {
                plusUsers += 1;
            } else {
                price += total;
            }            
        }
        
        if(plusUsers > maxPlusUsers) {
            maxPlusUsers = plusUsers;
            maxPrice = price;
        } else if(plusUsers === maxPlusUsers) {
            maxPrice = Math.max(maxPrice, price);
        }
    }
    
    return [maxPlusUsers, maxPrice]
}

function discountPermutation(length) {
    let rates = [10, 20, 30, 40]
    let result = []
    
    function dfs(current) {
        if(current.length === length) {
            result.push([...current])
            return
        }
        
        for(let i = 0; i < rates.length; i++) {
            current.push(rates[i])
            dfs(current)
            current.pop()
        }
    }
    
    dfs([])
    
    return result
}