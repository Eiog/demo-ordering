<script setup lang="ts" name="UList"></script>
<template>
  <view class="w-full flex flex-col gap-2 px-3">
    <view
      class="w-full h-28 flex items-center bg-white rounded-lg shadow shadow-md shadow-gray-100"
      v-for="(item, index) in 5"
      :key="index"
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
  </view>
</template>
<style scoped lang="less"></style>
