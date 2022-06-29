<script setup lang="ts" name="Shop">
import Search from './components/Search.vue';
</script>
<template>
  <view class="w-full h-full">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="w-full h-20 px-2">
        <Search />
    </view>
  </view>
</template>
<style scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
