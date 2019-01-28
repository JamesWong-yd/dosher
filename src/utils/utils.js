// get menuItem
export function getMenuItemAndKey(locationRouter, routes) {
  let locationRoutes = []
  let openkeys = []
  let breadcrumb = []
  //  items
  let itemMenu = routes.map(item => {
    if (!item.routes && item.path === locationRouter) {
      breadcrumb.push(item.itemMenu)
      locationRoutes.push(`item-${item.path}`)
    }
    if (item.routes) {
      if (!breadcrumb.length) {
        breadcrumb.push(item.itemMenu)
      }
      openkeys.push(`subitem-${item.path}`)
      item.routes = item.routes.slice(0, routes.length - 1).sort((a, b) => a.index - b.index)
      item.routes.some(subitem => {
        if (subitem.path === locationRouter) {
          locationRoutes.push(`item-${subitem.path}`)
          breadcrumb.push(subitem.itemMenu)
          return true
        }
      })
    }
    return item
  }).slice(0, routes.length - 1).sort((a, b) => a.index - b.index)

  return {
    itemMenu,
    locationRoutes,
    openkeys,
    breadcrumb
  }
}