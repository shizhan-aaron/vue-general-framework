<template>
  <div class="">
    <el-table :data="allRoles" border style="width: 100%">
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="操作" width="200">
        <el-button type="text" size="mini"> 分配权限 </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
</script>

<style lang="scss" scoped></style>
