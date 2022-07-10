<script setup lang="ts">
import { ref, onMounted } from "vue";
import UTabs from "@/components/common/UTabs/index.vue";
import UMap from "./components/UMap.vue";
import UList from "./components/UList.vue";
import { shopApi } from "@/api";
type Location = {
  longitude: number;
  latitude: number;
};
const shopListData = ref<SHOP.ShopInfo[]>();
function getShopList() {
  shopApi.findList().then((res: any) => {
    shopListData.value = res;
    // console.log(res);
  });
}

onMounted(() => {
  getShopList();
});
const index = ref(0);
const tabData = ref([
  {
    key: "1",
    label: "附件门店",
  },
  {
    key: "2",
    label: "常去门店",
  },
]);
function onChange(data: any) {
  // console.log(data);
}
const mapShow = ref(true);
const location = ref<Location|undefined>()

function handleOpenLocationWindow(){
  uni.chooseLocation({
    success:res=>{
      location.value = res
      getShopList()
      console.log(res);
    }
  })
}
</script>
<template>
  <view class="w-full h-full flex flex-col gap-3 bg-gray-100 pt-2">
    <view class="w-full h-10 flex items-center">
      <view class="h-full flex-1">
      <u-tabs :data="tabData" v-model:index="index" @on-change="onChange" />
      </view>
      <view class="w-30 h-8 bg-white rounded-full flex items-center gap-1 pl-2 text-gray-800 mr-3"
      @click="handleOpenLocationWindow"
      >
        <text class="i-ri-search-2-line"></text>
        <text class="text-sm leading-none">搜索店铺</text>
      </view>
    </view>
    <view class="w-full flex flex-col bg-white">
      <u-map v-if="mapShow" :location="location" />
      <view
        class="flex items-center justify-center py-2 shadow shadow-md shadow-gray-100"
        @click="mapShow = !mapShow"
      >
        <text class="text-gray-500">收起地图</text>
      </view>
    </view>
    <view>
      <u-list :data="shopListData" />
    </view>
  </view>
</template>
<style></style>
