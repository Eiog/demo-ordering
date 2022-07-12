<script setup lang="ts" name="UserCard">
import { useAppStore } from "@/store";
const appStore = useAppStore();
const handleLogin = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};
const progressVal = ref(50);
</script>
<template>
  <view
    class="w-full h-full flex items-center gap-3 px-3 bg-white rounded-xl shadow"
  >
    <view class="w-100rpx h-100rpx flex items-center justify-center rounded-full bg-gray-300 overflow-hidden">
      <text v-if="!appStore.userInfo" class="i-ri-user-line  text-4xl text-gray-100"></text>
      <image
        class="w-full h-full"
        v-if="appStore.userInfo"
        :src="appStore.userInfo?.avatar"
        mode="aspectFill"
      />
    </view>
    <view class="flex-1 flex flex-col gap-1">
      <text>{{appStore.userInfo?appStore.userInfo.name:'请登录'}}</text>
      <view class="w-full h-12rpx bg-gray-300 rounded-full overflow-hidden">
        <view class="w-50% h-full bg-red-500 rounded-full"></view>
      </view>
      <text class="text-xs text-gray-500">登录可享[会员特权]等其他权益</text>
    </view>
    <view>
      <text
        class="block px-2 py-2 rounded-md bg-red-500 text-xs text-white active:bg-red-600"
        @click="handleLogin"
        >授权登录</text
      >
    </view>
  </view>
</template>
<style scoped lang="less"></style>
