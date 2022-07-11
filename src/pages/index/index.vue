<template>
  <tm-app ref="app">
    <tm-carousel
      autoplay
      :height="800"
      model="dot"
      color="red"
      _class=""
      :list="swiperUrl"
    ></tm-carousel>
    <tm-sheet :round="3" :shadow="2">
    
    </tm-sheet>
  </tm-app>
</template>

<script setup lang="ts" name="aaa">
import { ref } from "vue";
import { useAppStore } from "@/store";
import http from "@/http";
import UserCard from "./components/UserCard.vue";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";
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
