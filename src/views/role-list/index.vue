<template>
  <div class="container">
    <el-table :data="allRoles" border style="width: 100%">
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="操作" width="200" #default="{ row }">
        <el-button
          type="text"
          size="mini"
          @click="onDistributePermissionClick(row)"
          v-permission="['distributePermission']"
        >
          分配权限
        </el-button>
      </el-table-column>
    </el-table>

    <distribute-permission-dialog
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import distributePermissionDialog from './components/distributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()

const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.container {
  @include app-main-wrapper;
}
</style>
