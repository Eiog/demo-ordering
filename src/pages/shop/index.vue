<script setup lang="ts" name="Shop">
import { ref,computed } from "vue";
import Search from "./components/Search.vue";
import ShopInfo from "./components/ShopInfo.vue";
import UTabs from "@/components/common/UTabs/index.vue";
const index = ref(0);
const tabData = ref<any>([
  
]);
function onChange(data: any) {

}
const shopData = {
  id: 10001,
  name: "蜜雪冰城（乐园店）",
  location: {
    longitude: 11,
    latitude: 22,
  },
  notice: [],
  goods: [
    {
      id: 1,
      classify: "限时特惠",
      data: [
        {
          id: 101,
          name: "满杯百香果",
          subtitle: "果茶",
          cover: "",
          oldPrice: 13,
          price: 12,
          tag: ["限时特价"],
        },
      ],
    },
    {
      id: 2,
      classify: "冰淇淋",
      data: [
        {
          id: 201,
          name: "雪王大圣代",
          subtitle: "黑珍珠",
          cover: "",
          oldPrice: 6,
          price: 6,
          tag: ["限时特价"],
        },
        {
          id: 201,
          name: "雪王大圣代（芒果）",
          subtitle: "芒果肉",
          cover: "",
          oldPrice: 6,
          price: 6,
          tag: ["限时特价"],
        },
      ],
    },
  ],
};
function fomartData(){
  shopData.goods.forEach(item=>{
    tabData.value.push({
      key:item.id,
      label:item.classify
    })
  })
}
fomartData()
const currentData = computed(()=>{
  return shopData.goods[index.value]
})
console.log(currentData.value);

</script>
<template>
  <view class="w-full h-full flex flex-col">
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
      <view class="w-40 bg-gray-50">
        <u-tabs
          vertical
          :data="tabData"
          v-model:index="index"
          @on-change="onChange"
        />
      </view>
      <view class="flex-1 bg-white">
        {{currentData}}
      </view>
    </view>
  </view>
</template>
<style scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
