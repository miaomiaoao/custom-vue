/**
 * @description 反转单向链表
 */


export interface ILinkListNode {
  value: number,
  next?: ILinkListNode // ?表示可有可无
}

/**
 * @description 反转单向链表,并返回反转之后的head node
 * @param listNode 
 */
export function reverseLinkList(listNode: ILinkListNode):ILinkListNode {
  // 定义三个指针
  let prevNode: ILinkListNode | undefined = undefined
  let curNode: ILinkListNode | undefined = undefined
  let nextNode: ILinkListNode | undefined = listNode

  // 以nextNode为主，遍历链表
  while(nextNode) {
    // 第一个元素 删掉next 防止循环引用
    // 初始化时，curNode就没有值,curNoode有值
    // 反转时，head没有next节点
    if(curNode && !prevNode) {
      // @ts-ignore
      delete curNode.next
    }

    // 反转指针
    if(curNode && prevNode) {
      // @ts-ignore
      curNode.next = prevNode
    }
    
    // 整体向后移动指针
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode?.next // ?. 属性如果获取不到,就返回一个空
  }
  // 最后一个节点的补充
  curNode!.next = prevNode // curNode可能没有值，会报错，加一个!号的意思是忽略报错，自己处理
  
  return curNode! // 同上，代码提示不会出现
}
/**
 * @description 根据数组创建单向链表
 * @param arr 
 */

export function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length
  if(length === 0) throw new Error('arr is empty')

  let curNode: ILinkListNode = {
    value: arr[length - 1]
  }
  if(length === 1) return curNode

  // 从数组的倒数第二项开始,给数组赋值
  for(let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode // 等于上一次的curNode
    }
  }

  return curNode
}

const arr = [100, 200, 300]
const linkList = createLinkList(arr)
console.log(linkList)