var reversePairs = function(arr) {
  if(arr === null || arr.length < 0) {
    return arr;
  }
  const sum = process(arr, 0, arr.length - 1);
  return sum
}

function process(arr, L, R) {
  if(L === R) return false;
  const mid = Math.floor((L + R) / 2)
  return process(arr, L, mid) + process(arr, mid+1, R) + merge(arr, L, mid, R)
}

function merge(arr, L, M, R) {
  let p1 = L, p2 = M+1, help = [], i = 0, count = 0;
  while(p1 <= M && p2 <= R) {
    if(arr[p1] > arr[p2]) {
      help[i++] = arr[p2++]
      count = count + (M - p1 + 1);
    } else {
      help[i++] = arr[p1++]
    }
  }
  while(p1 <= M) {
    help[i++] = arr[p1++]
  }

  while(p2 <= R) {
    help[i++] = arr[p2++]
  }
  for(let i = 0; i < help.length; i++) {
    arr[L+i] = help[i];
  }
  return count
}

reversePairs([1,2,1,2,1])