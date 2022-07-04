<script setup lang="ts" name="UList">
import { ref } from "vue";
import BottomPopup from '@/components/common/fui-bottom-popup.vue'
import UPopup from "./UPopup.vue";
type Props = {
  data?:Shop.ShopList[]
}
const props = defineProps<Props>()
const popupShow = ref(false);
function popupOnClose(e: any) {
  popupShow.value = false;
}
const currentShop = ref<Shop.ShopList>()
function handleShopClick(item:Shop.ShopList){
  currentShop.value = item
  popupShow.value = true
}
</script>
<template>
  <view class="w-full flex flex-col gap-2 px-3">
    <view
      class="w-full h-28 flex items-center bg-white rounded-lg shadow shadow-md shadow-gray-100"
      v-for="(item, index) in props.data"
      :key="index"
      @click="handleShopClick(item)"
    >
      <view class="flex-1 flex flex-col gap-0.5 items-start pl-3">
        <text class="font-bold">{{item.name}}</text>
        <text class="text-sm text-gray-500">{{item.addr}}</text>
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
    <UPopup :data="currentShop" :show="popupShow" @on-close="popupOnClose" />
  </view>
</template>
<style scoped lang="less"></style>
