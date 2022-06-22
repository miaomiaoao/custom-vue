function customInstanceof(instance, origin) {
  if (instance === null) return 

  const type = typeof instance
  if (type !== 'object' && type !== 'function') {
    return false
  }

  let tempInstance = instance

  while(tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true
    } 
    
    tempInstance = tempInstance.__proto__
  }

  return false
}


const arr = []
console.log(customInstanceof(arr, Array))