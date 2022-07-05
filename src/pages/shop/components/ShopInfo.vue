<script setup lang="ts" name="ShopInfo">
type Props = {
  data?:SHOP.ShopInfo
}
const props = defineProps<Props>()
</script>
<template>
  <view class="flex flex-col gap-1 px-2">
    <view class="flex items-center">
      <view class="flex-1 flex flex-col">
        <view class="flex items-center">
          <text class="leading-normal">{{props.data?.name}}</text>
          <text class="i-ic-baseline-chevron-right text-xl"></text>
        </view>
        <view class="flex items-center text-gray-500">
          <text class="i-carbon-location"></text>
          <text class="text-sm leading-normal">距离您500m</text>
        </view>
      </view>
      <view class="flex items-center justify-center px-2 py-1 rounded-md bg-red-600 text-white">
        <text class="text-sm leading-normal">自提</text>
      </view>
    </view>
    <view class="flex items-center gap-1 relative">
        <view class="flex items-center justify-center w-5 h-5 rounded-md bg-red-600">
            <text class="text-xs text-white leading-normal">减</text>
        </view>
        <view class="flex-1">
            <text class="text-sm text-red-600">{{props.data?.notice[0]}}</text>
        </view>
        <view>
            <text class="i-ic-round-keyboard-arrow-down text-xl"></text>
        </view>
    </view>
  </view>
</template>
<style scoped lang="less"></style>
