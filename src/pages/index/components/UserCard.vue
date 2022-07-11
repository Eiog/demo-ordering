<script setup lang="ts" name="UserCard">
import { useAppStore } from '@/store';
const appStore = useAppStore()
const handleLogin = ()=>{
    uni.navigateTo({url:'/pages/login/index'})
}
</script>
<template>
  <view
    class="w-full h-full flex items-center gap-3 px-3 bg-white shadow shadow-md shadow-gray-200 rounded-xl"
  >
    <view class="w-14 h-14 rounded-full overflow-hidden">
      <image
        class="w-full h-full"
        :src="appStore.userInfo?.avatar"
        mode="aspectFill"
      />
    </view>
    <view class="flex-1 flex flex-col gap-1">
      <text class="font-bold">{{appStore.userInfo?appStore.userInfo.name:'尊敬的客户'}}</text>
      <view class="w-full h-1.5 bg-gray-300 rounded-full"></view>
      <text class="font-normal text-xs text-gray-500"
        >会员可享[限时优惠]等多项权益</text
      >
    </view>
    <view
      class="w-16 h-7 bg-red-600 rounded-md flex items-center justify-center"
    >
      <text class="text-white text-xs" @click="handleLogin">授权登录</text>
    </view>
  </view>
</template>
<style scoped lang="less"></style>
