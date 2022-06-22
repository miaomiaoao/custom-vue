var mergeSort = function(arr) {
  if(arr === null || arr.length < 2) {
    return;
  }
  process(arr, 0, arr.length - 1);
  console.log(arr);
}

function process(arr, L, R) {
  if(L === R) return;
  let mid = Math.floor((L + R) / 2);
  process(arr, L, mid);
  process(arr, mid+1, R);
  merge(arr, L, mid, R);
}

// 实现归并操作
function merge(arr, L, M, R) {
  let p1 = L, p2 = M + 1, i = 0, help = [];
  while(p1 <= M && p2 <= R) {
    help[i++] = arr[p1] > arr[p2] ? arr[p2++] : arr[p1++]
  }

  while(p1 <= M) {
    help[i++] = arr[p1++]
  }

  while(p2 <= R) {
    help[i++] = arr[p2++]
  }

  for(let i = 0; i < help.length; i++) {
    arr[L+i] = help[i]
  }
}
mergeSort([7, 3, 4, 2, 8, 9])

