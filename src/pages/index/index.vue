<template>
  <view class="w-full h-full">
    <view class="w-full h-800rpx">
      <image class="w-full h-full" :src="swiperUrl[1].url" mode="aspectFill" />
    </view>
    <view class="w-full h-120rpx px-3">
      <user-card></user-card>
    </view>
  </view>
</template>

<script setup lang="ts" name="aaa">
import { ref } from "vue";
import { useAppStore } from "@/store";
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
