// 发布订阅拥有on emit once off

class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  emit(type, ...rest) {
    this.event[type] && this.event[type].forEach(fn => fn.apply(this, rest))
  }

  once(type, callback) {
    function fn() {
      callback()
      this.off(type, fn)
    }
    this.on(type, fn)
  }

  off(type, callback) {
    if (this.events[type]) {
      this.events[type] = this.events.filter(item => {
        item !== callback
      })
    }
  }
}


// 使用如下
// const event = new EventEmitter();

// const handle = (...rest) => {
//   console.log(rest);
// };

// event.on("click", handle);

// event.emit("click", 1, 2, 3, 4);

// event.off("click", handle);

// event.emit("click", 1, 2);

// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");