import { History } from './base'

function ensureSlash() {
  // location.hash判断是否有hash，有兼容性问题
  // 如果兼容性有问题 可以用window.location.href判断
  if(window.location.hash) {
    return
  }
  window.location.hash = '/'
}

function getHash() {
  return window.location.hash.slice(1)
}

class HashHistory extends History {
  constructor(router) {
    super(router)
    this.router = router

    // 确保hash模式下 有一个/路径, hash模式默认加#
    ensureSlash()
  }

  getCurrentLocation() {
    // 拿到最新的hash值
    return getHash()
  }

  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location
    })
  }

  setupListeners() {
    window.addEventListener('hashchange', () => {
      // hash变了，拿到最新的hash值，再做一次跳转
      this.transitionTo(getHash())
    })
  }
  

}

export default HashHistory 