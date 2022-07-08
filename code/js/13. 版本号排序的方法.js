/**
 * 题目描述: 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。 现在需要对其进行排序， 排序的结果为['4.3.5', '4.3.4.5', '2.3.3', '0.302.1', '0.1.1']

 作者： Big shark @LX
 链接： https: //juejin.cn/post/6968713283884974088
   来源： 稀土掘金
 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。
 */
arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
});
console.log(arr);