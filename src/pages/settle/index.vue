<script setup lang="ts" name="Settle">
import { useShopStore } from "@/store";
const shopStore = useShopStore();
const count = computed(() => {
  let count = 0;
  shopStore.checkedCart?.forEach((item) => {
    count += item.goods.selectCount!;
  });
  return count;
});
const price = computed(() => {
  let price = 0;
  shopStore.checkedCart?.forEach((item) => {
    price += item.goods.price;
  });
  return price;
});
</script>
<template>
  <view class="w-full h-full bg-gray-100 flex flex-col">
    <view class="p-3 flex flex-col gap-3">
      <view class="w-full h-300rpx bg-white rounded-xl"></view>
      <view class="w-full flex flex-col gap-1 bg-white rounded-xl">
        <view
          class="w-full flex items-center gap-3 p-3"
          v-for="(item, index) in shopStore.checkedCart"
          :key="index"
        >
          <view class="w-120rpx h-120rpx rounded-md overflow-hidden bg-gray-50">
            <image :src="item.goods.cover" mode="aspectFill" />
          </view>
          <view class="flex-1 flex flex-col gap-1">
            <text class="text-base">{{ item.goods.name }}</text>
            <view class="flex items-center gap-1">
              <text
                class="text-sm text-gray-500"
                v-for="(_item, _index) in item.sku"
                :key="_index"
                >{{ _item.name }}</text
              >
            </view>
          </view>
          <view class="flex flex-col items-end justify-center">
            <text class="text-sm">x{{ item.goods.selectCount }}</text>
            <text class="text-sm text-red-600"
              >￥<text class="text-xl">{{ item.goods.price }}</text></text
            >
          </view>
        </view>
        <view class="h-1px bg-gray-300 mx-3"></view>
        <view class="p-3 flex items-center justify-end">
          <text class="text-gray-500"
            >共{{ shopStore.count }}件，合计￥<text
              class="font-bold text-xl text-red-600"
              >{{ shopStore.price }}</text
            ></text
          >
        </view>
      </view>
    </view>
    <view class="mt-auto w-full h-120rpx bg-white flex items-center px-3">
        <text class="mr-auto">实付：￥<text class="text-xl text-red-600 font-bold">{{shopStore.price}}</text></text>
        <text class="px-3 py-2 bg-red-600 rounded-md text-white active:bg-red-700">确认支付</text>
    </view>
  </view>
</template>
<style scoped lang="less"></style>
