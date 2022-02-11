<template>
  <div class="container">
    <el-table
      :data="allPermission"
      style="width: 80%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="name" label="权限名称" width="200" />
      <el-table-column prop="mark" label="权限标识" width="220" />
      <el-table-column prop="desc" label="权限描述" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-button type="text" v-if="row.type === 'menu'">新增</el-button>
          <el-button type="text" v-permission="['distributeRole']"
            >编辑</el-button
          >
          <el-button type="text" v-permission="['removeUser']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'

const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.container {
  @include app-main-wrapper;
}
</style>
