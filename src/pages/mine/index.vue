<script setup lang="ts" name="">
import { ref } from "vue";
import { useAppStore } from "@/store";
const appStore = useAppStore()
const handleLogin = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};
</script>
<template>
  <view class="w-full h-full flex flex-col relative px-5">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="w-full h-100rpx">

    </view>
    <view class="w-full h-200rpx flex items-center gap-3">
      <view
        class="w-120rpx h-120rpx flex items-center justify-center bg-gray-200 rounded-full overflow-hidden"
      >
      <view class="w-full h-full flex items-center justify-center"  v-if="!appStore.userInfo" @click="handleLogin">
        <text class="i-ri-user-line  text-4xl text-gray-100"></text>
      </view>
      
      <image
        class="w-full h-full"
        v-if="appStore.userInfo"
        :src="appStore.userInfo?.avatar"
        mode="aspectFill"
      />
      </view>
      <text>{{appStore.userInfo?appStore.userInfo.name:'登录享受更多会员权益'}}</text>
      <view class="py-1 px-2 flex items-center gap-1 bg-rose-400 rounded-full text-white ml-auto">
        <text class="i-ri-capsule-fill text-xl"></text>
        <text class="text-sm">签到</text>
      </view>
    </view>
    <view class=" w-full h-280rpx">
      <view
        class="w-full h-full p-4 flex items-center gap-2 rounded-xl bg-gradient-to-br from-rose-400 to-rose-500 shadow"
      >
        <view class="flex-1 h-full flex flex-col justify-center gap-3">
          <text class="text-xl font-bold text-white">微雪花会员</text>
          <view class="flex flex-col gap-1">
            <text class="text-white">甜蜜值：100</text>
            <view
              class="w-300rpx h-1.5 rounded-full bg-white bg-opacity-30 overflow-hidden"
            >
              <view class="w-50% h-full bg-white rounded-full"></view>
            </view>
            <text class="text-white text-xs"
              >再升1级可享[升级礼包]等6项权益</text
            >
          </view>
        </view>
        <view class="w-160rpx h-full flex flex-col justify-center flex-nowrap">
          <text class="i-ri-bell-line text-white text-6xl shadow"></text>
          <view class="flex items-center text-white">
            <text class="text-sm">查看权益</text>
            <text class="i-ri-arrow-drop-right-line text-xl"></text>
          </view>
        </view>
      </view>
    </view>
    <view
      class="-z-10 absolute left-0 top-0 w-full h-600rpx bg-gradient-to-b from-pink-100 to-white"
    >
    </view>
  </view>
</template>
<style>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
