<script setup lang="ts" name="Shop">
import { ref, computed } from "vue";
import Search from "./components/Search.vue";
import ShopInfo from "./components/ShopInfo.vue";
import UTabs from "@/components/common/UTabs/index.vue";
import GoodsList from "./components/GoodsList.vue";
import SkuSelect from "./components/SkuSelect.vue";
import {shopApi} from '@/api'
const index = ref(0);
const tabData = ref<any>([]);
function onChange(data: any) {}
function getShopData(){
  shopApi.find(1000).then((res:any)=>{
    console.log(res);
    shopData.value = res.data
    fomartData();
  })
}
getShopData()
const shopData = ref<Shop.ShopData>()
function fomartData() {
  shopData.value?.goods.forEach((item) => {
    tabData.value.push({
      key: item.id,
      label: item.classify,
    });
  });
}

const currentData = computed(() => {
  return shopData.value?.goods[index.value];
});
const selectShow = ref(false);
function onSelect(data:Shop.GoodData) {
  skuSelectData.value = data
  selectShow.value = true;
}
const skuSelectData = ref<Shop.GoodData>()
</script>
<template>
  <view class="w-full h-full flex flex-col relative">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="w-full h-20 px-2">
      <Search />
    </view>
    <view class="w-full h-20 px-2">
      <ShopInfo />
    </view>
    <view class="flex-1 w-full flex flex-shrink-0 min-h-0 bg-gray-100">
      <view class="w-30 bg-gray-50">
        <u-tabs
          vertical
          :data="tabData"
          v-model:index="index"
          @on-change="onChange"
        />
      </view>
      <view class="flex-1 bg-white px-2">
        <goods-list :data="currentData?.data" @on-select="onSelect" />
      </view>
      <view
        class="absolute left-0 bottom-0 w-full h-16 px-4 flex items-center gap-3 border-t border-t-gray-100 bg-white"
      >
        <view class="w-12 h-12 relative shopping">
          <view
            class="absolute -right-2 top-0 px-2 bg-yellow-500 leading-normal text-xs text-white rounded-full rounded-tl-xl shadow shadow-xs"
            >3</view
          >
        </view>
        <view class="mr-auto">
          <text class="text-sm">合计：</text>
          <text class="font-bold">￥</text>
          <text class="font-bold text-2xl">55</text>
        </view>
        <view
          class="w-26 h-10 flex items-center justify-center text-gray-500 leading-normal bg-gray-100 rounded-md"
          >去结算</view
        >
      </view>
          <SkuSelect v-if="selectShow" @on-close="selectShow = false" :data="skuSelectData"></SkuSelect>
    </view>
  </view>
</template>
<style scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
.shopping {
  background-image: url("/static/image/shopping_cart.png");
  background-position: center;
  background-size: 100%;
}
</style>
