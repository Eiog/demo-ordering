<script setup lang="ts" name="Shop">
import { ref, computed } from "vue";
import Search from "./components/Search.vue";
import ShopInfo from "./components/ShopInfo.vue";
import UTabs from "@/components/common/UTabs/index.vue";
import GoodsList from "./components/GoodsList.vue";
import SkuSelect from "./components/SkuSelect.vue";
import UTransition from "@/components/common/Transition.vue";
const index = ref(0);
const tabData = ref<any>([]);
function onChange(data: any) {}
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
          sku: [
            {
              name: "温度",
              select: [
                {
                  id: 1001,
                  name: "正常",
                },
                {
                  id: 1002,
                  name: "少冰",
                },
                {
                  id: 1003,
                  name: "常温",
                },
              ],
            },
          ],
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
function fomartData() {
  shopData.goods.forEach((item) => {
    tabData.value.push({
      key: item.id,
      label: item.classify,
    });
  });
}
fomartData();
const currentData = computed(() => {
  return shopData.goods[index.value];
});
console.log(currentData.value);
const selectShow = ref(false);
function onSelect(data: any) {
  selectShow.value = true;
}
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
        <goods-list :data="currentData.data" @on-select="onSelect" />
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
        <UTransition :show="selectShow" >
          <view class="w-20 h-20 bg-red-500"></view>
        </UTransition>
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
