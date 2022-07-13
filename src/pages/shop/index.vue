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
const shopStore = useShopStore();
const tabIndex = ref(0);

function getShopData() {
  shopApi.find(1000).then((res) => {
    shopStore.shopInfo = res.info;
    shopStore.goodsClassify = res.goodsClassify
  });
}
getShopData();

function fomartGoods(data: SHOP.GoodsClassify[]) {
  return data.map((item) => {
    item.selected = false;
    item.selectCount = 0;
    item.goods.map((_item) => {
      _item.selected = false;
      _item.selectCount = 0;
      return _item;
    });
    return item;
  });
}

const selectShow = ref(false);
function onSelect({classify,goods}:{classify:SHOP.GoodsClassify,goods:SHOP.Goods}) {
  skuSelectData.value = goods;
  goodsClassify.value = classify
  selectShow.value = true;
}
const skuSelectData = ref<SHOP.Goods>();
const goodsClassify = ref<SHOP.GoodsClassify>()
function handleSkuChecked(sku: SHOP.Sku["items"]) {
  const data:SHOP.ShopCart = {
    shop:shopStore.shopInfo!,
    goodsClassify:goodsClassify.value!,
    goods:skuSelectData.value!,
    sku:sku,
    count:1,
    checked:true
  }
  shopStore.setCart(data)
}
const currentClassifyId = ref(0);
const listIndex = ref(0)
function tabsOnChange(data: any) {
  listIndex.value = data.index
}
function onListScroll(index:number){
  tabIndex.value = index
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
          :data="shopStore._goodsClassify!"
          :index="tabIndex"
          @on-change="tabsOnChange"
        />
      </view>
      <view class="flex-1 bg-white px-2 min-w-0">
        <goods-list
          :data="shopStore._goodsClassify!"
          :index="listIndex"
          @on-scroll="onListScroll"
          @on-select="onSelect"
        />
      </view>
      <ShopCard />
      <SkuSelect
        :show="selectShow"
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
