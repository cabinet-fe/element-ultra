export const dfs = <T extends Record<string, any>>(
  treeData: T[],
  cb: (item: T) => void
) => {
  treeData.forEach(item => {
    cb(item)
    if (item.children?.length) {
      dfs(item.children, cb)
    }
  })
}

export const dfsMap = <T extends Record<string, any>>(
  treeData: T[],
  cb: (item: T) => T
) => {
  return treeData.map(item => {
    const ret = cb(item)

    if (item.children?.length) {
      // @ts-ignore
      item.children = dfsMap(item.children, cb)
    }

    return ret
  })
}
