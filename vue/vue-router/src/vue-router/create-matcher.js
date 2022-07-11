import { createRouteMap } from "./create-route-map"
import { createRoute } from "./history/base"

export default function createMatcher(routes) {

  // 扁平化 pathMap = {'/': Home, '/about': About, '/about/a': AboutA }

  let { pathMap } = createRouteMap(routes) // 扁平化配置
  
  function match(location) {
    let record = pathMap[location]
    console.log(record)

    
    if (record) {
      return createRoute(record, {
        path: location
      })
    }
    return createRoute(null, {
      path: location
    })
    
    // 这个记录可能没有
  }

  function addRoutes(routes) {
    // 添加的路由，也需要调用createRouteMap
    createRouteMap(routes, pathMap)
  }

  return {
    addRoutes, // 添加路由
    match // 用于匹配路径
  }

}