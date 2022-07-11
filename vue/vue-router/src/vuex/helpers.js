// 放mapState 和 mapGetters

export function mapState(stateArr) {
  let obj = {}
  for(let i = 0; i < stateArr.length; i++) {
    let stateName = stateArr[i]
    obj[stateName] = function() {
      return this.$store.state[stateName]
    }
  }
  return obj
}


export function mapGetters(gettersArray) {
  let obj = {}
  for(let i = 0; i < gettersArray.length; i++) {
    let getterName = gettersArray[i]

    obj[getterName] = function() {
      return this.$store.getters[getterName]
    }
  }
  return obj
}