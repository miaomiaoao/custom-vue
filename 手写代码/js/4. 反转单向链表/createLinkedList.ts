/**
 * @description 创建单向链表
 */

// 定义一个接口
interface ILinkListNode {
  value: number,
  next?: ILinkListNode // 表示next可有可无，若有类型是ILinkListNode
}


function createLinkList(arr: number[]): ILinkListNode {
  const len = arr.length
  
  if(len === 0) throw new Error('arr is Empty')

  let curNode: ILinkListNode = {
    value: arr[len - 1]
  }
  for(let i = len - 2;i >= 0;  i--) {
    const value = arr[i]
    curNode = {
      value: value,
      next: curNode
    }
  }
  return curNode
}


function reverseLinkList(linkList: ILinkListNode): ILinkListNode {

}

console.log(createLinkList([1, 3, 4]))