<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="success" @click="onAddUserClick"> 添加用户 </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column prop="account" label="邮箱/账号" align="center" />
        <el-table-column prop="nickname" label="昵称" align="center" />
        <el-table-column label="角色" align="center">
          <template #default="{ row }">
            <div v-if="row.role">
              <el-tag>{{ row.role.name }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">未知</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开通时间" align="center">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="260" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row.id)"
              >查看</el-button
            >
            <el-button
              type="info"
              size="mini"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >角色</el-button
            >
            <el-button type="danger" size="mini" v-permission="['removeUser']"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>

    <register-dialog v-model="registerDialogVisible"></register-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { userManageList } from '@/api/userManage'
import rolesDialog from './components/role.vue'
import registerDialog from './components/register.vue'
import { useRouter } from 'vue-router'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const perPage = ref(10)
// 获取数据的方法
const getListData = async () => {
  const result = await userManageList({
    page: page.value,
    perPage: perPage.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  perPage.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

/**
 * 添加用户
 */
const registerDialogVisible = ref(false)
const onAddUserClick = () => {
  registerDialogVisible.value = true
}

/**
 * 查看用户详情
 */
const router = useRouter()
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

/**
 * 为员工分配角色
 */
const roleDialogVisible = ref(false)
const selectUserId = ref(0)
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row.id
}
// 保证每次打开dialog都可以重新获取数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = 0
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
