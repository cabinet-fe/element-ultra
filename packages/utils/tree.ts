export const dfs = <T extends Record<string, any>>(treeData: T[], cb: (item: T) => void) => {
  let stack = [...treeData]

  while(stack.length) {
    const node = stack.shift()
    if (!node) continue
    cb(node)

    if (node.children?.length) {
      stack = [...node.children, ...stack]
    }
  }
}
