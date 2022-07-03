<script setup lang="ts" name="UList">
import { ref } from "vue";
import BottomPopup from '@/components/common/fui-bottom-popup.vue'
const popupShow = ref(false);
function maskClose(e: any) {
  if (e.target.id != "mask") return;
  popupShow.value = false;
}
function goShop(){
  uni.navigateTo({url:'/pages/shop/index'})
  popupShow.value = false
}
</script>
<template>
  <view class="w-full flex flex-col gap-2 px-3">
    <view
      class="w-full h-28 flex items-center bg-white rounded-lg shadow shadow-md shadow-gray-100"
      v-for="(item, index) in 5"
      :key="index"
      @click="popupShow = true"
    >
      <view class="flex-1 flex flex-col gap-0.5 items-start pl-3">
        <text class="font-bold">蜜雪冰城(乐园店)</text>
        <text class="text-sm text-gray-500">乐园就222号</text>
        <text class="text-sm text-gray-500">营业时间22-22</text>
        <view class="px-1 py-0.5 bg-red-700 rounded-sm text-white text-xs"
          >营业中</view
        >
      </view>
      <view class="w-1 h-full bg-gray-100 rounded-full"></view>
      <view
        class="h-full w-24 flex flex-col items-center justify-center gap-2 px-3"
      >
        <text class="text-sm text-gray-500">距离669m</text>
        <view class="w-full flex items-center justify-center gap-1">
          <view
            class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
          >
            <text class="i-bx-bxs-navigation text-xl text-red-600"></text>
          </view>
          <view
            class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
          >
            <text class="i-ic-round-local-phone text-xl text-red-600"></text>
          </view>
        </view>
      </view>
    </view>
    <BottomPopup :show="popupShow" @close="popupShow = !popupShow">
    <view>
      <view class="w-full h-14 flex items-center px-3 bg-red-50 text-red-700">
          <text>公告</text>
        </view>
        <view class="w-full flex-1 flex flex-col gap-2 px-3">
          <view class="w-full flex items-center">
            <view class="flex-1 flex flex-col gap-1">
              <text class="font-bold">蜜雪冰城（乐园店）</text>
              <text class="text-sm">乐园就222号</text>
            </view>
            <view class="">
              <text>距离400m</text>
            </view>
          </view>
          <view class="w-full h-46 rounded-md bg-gray-100"> </view>
            <view
              class="w-full h-10 flex items-center justify-center text-white bg-red-500 rounded-md"
              @click="goShop"
            >
              去点单
            </view>
        </view>
    </view>
    </BottomPopup>
  </view>
</template>
<style scoped lang="less"></style>
