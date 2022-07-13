<script setup lang="ts" name="ShopCard">
import { ref } from "vue";
import { useShopStore } from "@/store";
const shopStore = useShopStore();
const cardPopupShow = ref(false);
</script>
<template>
  <view
    @click="cardPopupShow = false"
    class="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 opacity-0 invisible transition-all z-98"
    :class="cardPopupShow ? '!visible !opacity-100' : ''"
  >
  </view>
  <view
    class="fixed left-0 bottom-16 w-full max-h-100 bg-white flex flex-col rounded-tl-2xl rounded-tr-2xl p-3 translate-y-50 opacity-0 invisible transition-all z-98"
    :class="cardPopupShow ? '!visible !opacity-100 !translate-y-0' : ''"
  >
    <view class="w-full flex items-center">
      <text class="font-bold text-base mr-auto"
        >已选商品 {{ shopStore.count }}</text
      >
      <text
        v-if="shopStore.shopCart!.length>0"
        class="text-gray-500"
        @click="shopStore.clearCart"
        >清空</text
      >
    </view>
    <view
      v-if="shopStore.shopCart!.length<1"
      class="w-full flex items-center justify-center"
    >
      <text class="py-3 text-gray-500 text-xl">什么都木有哦</text>
    </view>
    <view
      v-if="shopStore.shopCart!.length>0"
      class="w-full flex-1 flex flex-col gap-3 mt-2 overflow-y-scroll"
    >
      <view
        class="w-full flex items-center gap-2"
        v-for="(item, index) in shopStore.shopCart"
        :key="index"
      >
        <view class="w-18 h-18 rounded-md overflow-hidden">
          <image
            class="w-full h-full"
            :src="item.goods.cover"
            mode="aspectFill"
          />
        </view>
        <view class="flex-1 flex flex-col">
          <text class="font-bold text-base">{{ item.goods.name }}</text>
          <view class="w-full flex gap-1">
            <text
              class="text-gray-500"
              v-for="(_item, _index) in item.sku"
              :key="_index"
              >{{ _item.name }}</text
            >
          </view>
          <view class="flex items-baseline text-red-600">
            <text class="">￥</text>
            <text class="font-bold text-base">{{
              item.goods.price * item.count
            }}</text>
          </view>
        </view>
        <view class="flex items-center gap-2">
          <view
            class="w-5 h-5 rounded-full bg-white border border-red-600 flex items-center justify-center"
            @click="shopStore.removeCart(item)"
          >
            <text class="i-ic-round-minus text-red-600 text-xl"></text>
          </view>
          <text>{{ item.count }}</text>
          <view
            class="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center"
            @click="shopStore.setCart(item)"
          >
            <text class="i-ic-round-plus text-white text-xl"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view
    class="fixed left-0 bottom-0 w-full h-16 px-4 border-t border-t-gray-100 bg-white z98"
  >
    <view class="w-full h-full flex items-center gap-3 bg-white">
      <view
        class="w-12 h-12 relative shopping"
        @click="cardPopupShow = !cardPopupShow"
      >
        <view
          class="absolute -right-2 top-0 px-2 bg-yellow-500 leading-normal text-xs text-white rounded-full rounded-tl-xl shadow shadow-xs"
          >{{ shopStore.count }}</view
        >
      </view>
      <view class="mr-auto">
        <text class="text-sm">合计：</text>
        <text class="font-bold">￥</text>
        <text class="font-bold text-2xl">{{ shopStore.price }}</text>
      </view>
      <view
        class="w-26 h-10 flex items-center justify-center text-gray-500 leading-normal bg-gray-100 rounded-md"
        :class="shopStore.count > 0 ? 'bg-yellow-400 text-red-600' : ''"
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
