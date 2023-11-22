let str = 'he56llo';

console.log(containsNumber(str))

function containsNumber(str){
    return /\d/.test(str)
}