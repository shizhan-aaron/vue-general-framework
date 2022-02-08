<template>
  <div class="container">
    <el-table
      :data="allPermission"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="permissionName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="permissionMark" label="权限标识" width="180">
      </el-table-column>
      <el-table-column prop="permissionDesc" label="权限描述">
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
