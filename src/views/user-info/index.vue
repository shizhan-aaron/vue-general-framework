<template>
  <div class="">用户详情</div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { userDetail } from '@/api/userManage.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
}
getUserDetail()
</script>

<style lang="scss" scoped></style>
