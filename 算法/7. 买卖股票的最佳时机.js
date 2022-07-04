/**
 * @param {number[]} prices
 * @return {number}
 * 输入：[7, 1, 5, 3, 6, 4]
 输出： 5
 解释： 在第 2 天（ 股票价格 = 1） 的时候买入， 在第 5 天（ 股票价格 = 6） 的时候卖出， 最大利润 = 6 - 1 = 5。
 注意利润不能是 7 - 1 = 6, 因为卖出价格需要大于买入价格； 同时， 你不能在买入前卖出股票。
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