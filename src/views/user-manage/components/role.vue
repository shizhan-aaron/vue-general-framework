<template>
  <el-dialog title="配置角色" :model-value="modelValue" @close="closed">
    <!-- <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group> -->
    <el-form label-width="120px">
      <el-form-item label="请分配角色">
        <el-select v-model="userRoleTitleList">
          <el-option
            v-for="item in allRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRole, updateRole } from '@/api/userManage'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])

/**
 * 确定按钮点击事件
 */
const onConfirm = async () => {
  await updateRole(props.userId, { id: userRoleTitleList.value })
  ElMessage.success('用户角色更新成功')

  // 通知父组件更新成功
  emits('updateRole')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

/**
 * 获取所有角色
 */
const allRoleList = ref([])
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()

/**
 * 获取当前用户角色
 */
const userRoleTitleList = ref(0)
const getUserRoles = async () => {
  const res = await userRole(props.userId)
  userRoleTitleList.value = res.id
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
