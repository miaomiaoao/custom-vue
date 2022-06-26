/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0]
  let maxProfit = 0;
  for(let i = 0; i < prices.length; i++) {
    if (prices[i] > min) {
      maxProfit = Math.max(maxProfit, prices[i] - min) 
    }

    if (prices[i] < min) {
      min = prices[i]
    }
  }  

  return maxProfit
};
console.log(maxProfit([7,2,5,3,6,4]));