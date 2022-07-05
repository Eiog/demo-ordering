<script setup lang="ts" name="ShopCard">
import { ref } from 'vue';
import { useShopStore } from '@/store';
const shopStore = useShopStore()
const cardPopupShow = ref(false)
</script>
<template>
<view v-if="cardPopupShow" @click="cardPopupShow = false" class="fixed inset-0 bg-black bg-opacity-30"></view>
  <view
    class="fixed left-0 bottom-0 w-full h-16 px-4  border-t border-t-gray-100 bg-white"
  >
  <view v-if="cardPopupShow" class="absolute left-0 bottom-16 w-full max-h-100  bg-white flex flex-col rounded-tl-2xl rounded-tr-2xl p-3">
    <view class="w-full flex items-center">
      <text class="font-bold text-base mr-auto">已选商品</text>
      <text class="text-gray-500">清空</text>
    </view>
    <view class="w-full flex-1 flex flex-col gap-3 mt-2 overflow-y-scroll">
      <view class="w-full flex items-center gap-2"
        v-for="(item, index) in shopStore.shopCart" :key="index"
      >
        <view class="w-18 h-18 rounded-md overflow-hidden">
          <image
          class="w-full h-full"
            :src="item.goods.cover"
            mode="aspectFill"
          />
        </view>
        <view class="flex-1 flex flex-col">
          <text class="font-bold text-base">{{item.goods.name}}</text>
          <view class="w-full flex gap-1">
            <text class="text-gray-500" v-for="(_item, _index) in item.sku" :key="_index">{{_item.name}}</text>
          </view>
          <view class="flex items-baseline text-red-600">
            <text class="">￥</text>
            <text class="font-bold text-base">{{item.goods.price*item.count}}</text>
          </view>
        </view>
        <view class="flex items-center gap-2">
          <view class="w-5 h-5 rounded-full bg-white border border-red-600 flex items-center justify-center">
            <text class=" i-ic-round-minus text-red-600 text-xl"></text>
          </view>
          <text>{{item.count}}</text>
          <view class="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
            <text class="i-ic-round-plus text-white text-xl"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="w-full h-full flex items-center gap-3">
    <view class="w-12 h-12 relative shopping" @click="cardPopupShow = !cardPopupShow">
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
  </view>
</template>
<style scoped>
.shopping {
  background-image: url("/static/image/shopping_cart.png");
  background-position: center;
  background-size: 100%;
}
</style>
