<script setup lang="ts" name="Shop">
import { ref, computed } from "vue";
import Search from "./components/Search.vue";
import ShopInfo from "./components/ShopInfo.vue";
import UTabs from "@/components/common/UTabs/index.vue";
import GoodsList from "./components/GoodsList.vue";
import SkuSelect from "./components/SkuSelect.vue";
import ShopCard from "./components/ShopCard.vue";
import { shopApi } from "@/api";
const index = ref(0);
const tabData = ref<any[]>([]);
function onChange(data: any) {}
function getShopData() {
  shopApi.find(1000).then((res: any) => {
    console.log(res);
    shopData.value = res.data;
    fomartData();
  });
}
getShopData();
const shopData = ref<Shop.ShopData>();
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
function onSelect(data: Shop.GoodData) {
  skuSelectData.value = data;
  selectShow.value = true;
}
const skuSelectData = ref<Shop.GoodData>();

const classifyIsSelects = computed(()=>{
  let selects = []
  tabData.value.filter(item=>{
    
  })
})
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
      <ShopCard />
      <SkuSelect
        v-if="selectShow"
        @on-close="selectShow = false"
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
