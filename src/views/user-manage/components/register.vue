<template>
  <el-dialog title="用户注册" :model-value="modelValue" @close="closed">
    <el-form
      style="width: 80%"
      :model="user"
      :rules="userRules"
      label-width="180px"
    >
      <el-form-item label="邮箱/账号" prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入 邮箱格式 账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="user.password"
          :type="passwordType"
          placeholder="请输入6位以上密码"
        />
        <span class="show-pwd">
          <span class="svg-container" @click="onChangePwdType">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </span>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="user.nickname"
          placeholder="请输入昵称，昵称为系统中显示名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="telephoneNumber">
        <el-input
          v-model="user.telephoneNumber"
          placeholder="请输入电话号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="telephoneNumber">
        <el-select v-model="user.roleId" placeholder="请选择用户角色">
          <el-option
            v-for="item in allRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input
          v-model="user.desc"
          placeholder="请输入用户描述信息（可选）"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="desc">
        <el-radio-group v-model="user.enable">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
import { ref, defineProps, defineEmits } from 'vue'
import { validatePassword } from '@/views/login/rules.js'
import { roleList } from '@/api/role'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const user = ref({
  account: '',
  password: '',
  nickname: '',
  telephoneNumber: '',
  roleId: null,
  desc: '',
  enable: 1
})

const userRules = ref({
  account: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ],
  nickname: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  telephoneNumber: [
    {
      required: true,
      trigger: 'blur',
      message: '电话号码为必填项'
    }
  ],
  roleId: [
    {
      required: true,
      trigger: 'blur',
      message: '角色为必填项'
    }
  ],
  enable: [
    {
      required: true,
      trigger: 'blur',
      message: '是否启用为必填项'
    }
  ]
})

/**
 * 获取所有角色
 */
const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()

/**
 * 处理密码文本框显示
 */
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

/**
 * 确定
 */
const onConfirm = () => {
  console.log(user.value)
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;

.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
