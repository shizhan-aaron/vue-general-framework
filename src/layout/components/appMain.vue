<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'

/**
 * 生成title
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title
  }

  return title
}

const route = useRoute()
const store = useStore()
watch(
  route,
  (to, from) => {
    // 并不是所有的路由都需要被保存
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.app-main {
  // 浏览器可视区域的高度 100vh
  background-color: $color--bg;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 120px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
