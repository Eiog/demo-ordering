<script setup lang="ts" name="UserCard">
import { useAppStore } from "@/store";
const appStore = useAppStore();
const handleLogin = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};
const progressVal = ref(50);
</script>
<template>
  <view class="w-full h-full">
    
  </view>
</template>
<style scoped lang="less"></style>
