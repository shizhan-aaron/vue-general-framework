import store from '@/store'

function checkPermission(el, binding) {
  // 获取对应的权限
  const { value } = binding

  // 获取当前用户的所有功能权限
  const functionals = store.getters.userInfo.permission.functionals

  // value 必须是一个数组
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = functionals.some(functional => {
      return value.includes(functional)
    })
    // 如果匹配失败
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin". "edit"...]')
  }
}

export default {
  /**
   * 在绑定元素的父组件被挂载之后调用
   * @param {*} el 当前指令绑定的bom
   * @param {*} binding 当前指令要传递的数组
   */
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  /**
   * 在包含组件的 VNode 及其子组件的 VNode 更新后调用
   * @param {*} el 当前指令绑定的bom
   * @param {*} binding 当前指令要传递的数组
   */
  update(el, binding) {
    checkPermission(el, binding)
  }
}
