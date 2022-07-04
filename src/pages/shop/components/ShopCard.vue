<script setup lang="ts" name="ShopCard">
import { useShopStore } from '@/store';
const shopStore = useShopStore()
</script>
<template>
  <view
    class="absolute left-0 bottom-0 w-full h-16 px-4 flex items-center gap-3 border-t border-t-gray-100 bg-white"
  >
    <view class="w-12 h-12 relative shopping">
      <view
        class="absolute -right-2 top-0 px-2 bg-yellow-500 leading-normal text-xs text-white rounded-full rounded-tl-xl shadow shadow-xs"
        >{{shopStore.count}}</view
      >
    </view>
    <view class="mr-auto">
      <text class="text-sm">合计：</text>
      <text class="font-bold">￥</text>
      <text class="font-bold text-2xl">{{shopStore.price}}</text>
    </view>
    <view
      class="w-26 h-10 flex items-center justify-center text-gray-500 leading-normal bg-gray-100 rounded-md  "
      :class="shopStore.count>0?'bg-yellow-400 text-red-600':''"
      >去结算</view
    >
  </view>
</template>
<style scoped>
.shopping {
  background-image: url("/static/image/shopping_cart.png");
  background-position: center;
  background-size: 100%;
}
</style>
