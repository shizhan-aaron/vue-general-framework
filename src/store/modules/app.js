import { getItem, setItem } from '@/utils/storage'
import { TAGS_VIEW } from '@/constant'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 添加tags
     */
    addTagsViewList (state, tag) {
      // 处理重复
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的tag修改title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 移除tag
     * @param { other || right || index } payload
     * @returns
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        // 如果传进来的索引是第一个则直接返回
        if (payload.index === 0) return
        // 删除该路由
        state.tagsViewList.splice(payload.index, 1)
        // 如果该路由是激活状态的执行下面代码
        if (payload.isActive) {
          if (payload.index >= state.tagsViewList.length) {
            // 如果该路由的索引值不小于删除后的viewList长度，则将激活路由设置为viewList中最后一个路由
            router.push(state.tagsViewList[state.tagsViewList.length - 1].path)
          } else {
            // 反之，仍将激活路由设置为原索引值对应的路由
            router.push(state.tagsViewList[payload.index].path)
          }
        }
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(1, payload.index)
        router.push('/profile')
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
