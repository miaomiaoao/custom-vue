export function createRouteMap(routes, oldPathMap) {
  let pathMap = oldPathMap || Object.create(null) // 默认没有传递就直接创建映射关系

  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })
  return {
    pathMap
  }
}

function addRouteRecord(route, pathMap, parent) {
  // 当访问/时， 应该渲染home组件 
  let path = parent ? (parent.path + '/' +  route.path) : route.path
  let record = {
    component: route.component
  }
  if (!pathMap[path]) { // 不能定义重复的路由，否则只生效第一个
    pathMap[path] = record
  } 

  // 先序，深度遍历
  if (route.children) {
    route.children.forEach(childRoute => {
      // 在遍历儿子时，将父亲的记录传进去
      addRouteRecord(childRoute, pathMap, record)
    })
  }
}