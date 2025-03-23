function solution(today, terms, privacies) {
    var answer = [];
    
    //약관종류와 기한을 담아낼 object
    let termsObj = {};
    
    //object 채우기
    terms.forEach(item => {
        const [key, value] = item.split(" ");
        termsObj[key] = value;
    })
    
    //약관가입날짜에 따라 만료여부 체크
    answer = privacies
        .map((v, i) => checkExpiration(v, today, termsObj) ? i + 1 : -1)
        .filter(i => i !== -1);
    
    return answer;
}

function checkExpiration(v, todayStr, termsObj) {
    let [date, key] = v.split(" ");
    
    //약관가입날짜
    let [year, month, day] = date.split(".").map(Number);
    
    //오늘날짜
    let [toYear, toMonth, toDay] = todayStr.split(".").map(Number);

    //약관파기날짜
    month += Number(termsObj[key]);
    
    year += Math.floor((month - 1) / 12);
    month = ((month - 1) % 12) + 1;

    //연도를 지남
    if (year < toYear) return true;
    //월을 지남
    if (year === toYear && month < toMonth) return true;
    //일을 지남
    if (year === toYear && month === toMonth && day <= toDay) return true;
    
    return false;
}
