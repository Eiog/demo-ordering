<template>
  <view class="w-full h-full">
    <view></view>
    <view class="w-full h-100">
      <uni-swiper-dot class="w-full h-full" mode="round ">
      <swiper
        class="w-full h-full"
        circular
        :indicator-dots="true"
        :autoplay="true"
      >
        <swiper-item v-for="(item, index) in swiperUrl" :key="index">
          <view
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <image
              class="w-full h-full"
              mode="aspectFill"
              :src="item.url"
            ></image>
          </view>
        </swiper-item>
      </swiper>
      </uni-swiper-dot>
    </view>
    <view class="w-full flex flex-col gap-2 px-3 -translate-y-6 ">
      <view
        class="w-full h-20"
      >
       <user-card />
      </view>

      <view class="flex flex-col gap-2">
        <view class="flex items-center justify-start gap-1">
          <text class="i-majesticons-map-marker-area-line"></text>
          <text class="text-xs">蜜雪冰城（立绘店）</text>
        </view>
        <view
          class="w-full h-40 flex items-center overflow-hidden shadow shadow-gray-200 rounded-xl"
        >
          <view class="w-25 h-full bg-gray-100"></view>
          <view class="flex-1 flex flex-col items-center justify-center">
            <text class="font-bold text-2xl">立即点餐</text>
            <text class="text-sm text-gray-400">收集点 到店取 免排队</text>
          </view>
          <view class="w-25 h-full bg-gray-100"></view>
        </view>

        <view class="w-full h-20 flex items-center gap-3 mt-5">
          <view class="h-full shadow-md shadow-gray-200 rounded-md flex-1 p-3"
          v-for="(item, index) in 3" :key="index"
          >
            <view class="w-full flex items-center justify-center">
              <text class="font-semibold">今天喝点啥</text>
            </view>
            <view></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="aaa">
import { ref } from "vue";
import { useAppStore } from "@/store";
import http from "@/http";
import UniSwiperDot from '@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue'
import UserCard from "./components/UserCard.vue";
const swiperUrl = [
  {
    url: "https://unlit.oss-cn-beijing.aliyuncs.com/2022-04-23/4819b5566b3510e62dca55fc6eb941a5.png?x-oss-process=style/thumb",
  },
  {
    url: "https://unlit.oss-cn-beijing.aliyuncs.com/2022-06-28T11%3A06%3A03%2B08%3A00/79ca70e4147acb23eddb9430481484c6.png?x-oss-process=style/thumb",
  },
  {
    url: "https://unlit.oss-cn-beijing.aliyuncs.com/2022-04-23/3cecf8da0b25daa9674a9404f268b07d.png?x-oss-process=style/thumb",
  },
];
const appStore = useAppStore();
const title = ref("Hello World");

</script>

<style></style>
