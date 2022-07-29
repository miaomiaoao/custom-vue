// 输入: 1 - > 2 - > 2 - > 1
// 输出: true

// 输入: 1 - > 2
// 输出: false


function isPalindrome(head) {
  let a = '',
    b = ''
  while (head) {
    const val = head.val
    a = a + val
    b = val + b
    head = head.next
  }

  console.log(a)
  console.log(b)

  return a === b
}

const head = {
  val: 1,
  next: {
    val: 2
  }
}

const head1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 2,
      next: {
        val: 1
      }
    }
  }
}

console.log(isPalindrome(head))
console.log(isPalindrome(head1))