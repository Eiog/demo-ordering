<script setup lang="ts" name="Shop">
import { ref, computed } from "vue";
import { useShopStore } from "@/store";
import Search from "./components/Search.vue";
import ShopInfo from "./components/ShopInfo.vue";
import Tabs from "./components/Tabs.vue";
import GoodsList from "./components/GoodsList.vue";
import SkuSelect from "./components/SkuSelect.vue";
import ShopCard from "./components/ShopCard.vue";
import { shopApi } from "@/api";
const shopStore = useShopStore()
const index = ref(0);

function getShopData() {
  shopApi.find(1000).then(res => {
    shopStore.shopInfo = res.info
    shopStore.goodsClassify = fomartGoods(res.goodsClassify)
  });
}
getShopData();

function fomartGoods(data:SHOP.GoodsClassify[]){
  return data.map(item=>{
    item.selected = false
    item.selectCount = 0
    item.goods.map(_item=>{
      _item.selected = false
      _item.selectCount = 0
      return _item
    })
    return item
  })
}

const selectShow = ref(false);
function onSelect(data: SHOP.Goods) {
  skuSelectData.value = data;
  selectShow.value = true;
}
const skuSelectData = ref<SHOP.Goods>();
function handleSkuChecked(data:SHOP.Sku['items']){
  
}
const currentClassifyId = ref(0)
function tabsOnChange(data:any){
  currentClassifyId.value = data.id
}
</script>
<template>
  <view class="w-full h-full flex flex-col relative pb-16">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="w-full h-20 px-2">
      <Search />
    </view>
    <view class="w-full h-20 px-2">
      <ShopInfo :data="shopStore.shopInfo" />
    </view>
    <view class="flex-1 w-full flex flex-shrink-0 min-h-0 bg-gray-100">
      <view class="w-30 flex-shrink-0 bg-gray-50">
        <Tabs
          vertical
          :data="shopStore.goodsClassify"
          v-model:index="index"
          @on-change="tabsOnChange"
        />
      </view>
      <view class="flex-1 bg-white px-2 min-w-0">
        <goods-list :data="shopStore.goodsClassify" :anchor="currentClassifyId" @on-select="onSelect" />
      </view>
      <ShopCard  />
      <SkuSelect
        v-if="selectShow"
        @on-close="selectShow = false"
        @on-checked="handleSkuChecked"
        :data="skuSelectData"
      ></SkuSelect>
    </view>
  </view>
</template>
<style scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
