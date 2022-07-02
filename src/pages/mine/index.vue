<script setup lang="ts" name="">
import { ref } from "vue";
import UTransition from "@/components/common/UTransition.vue";
import UPopup from "@/components/common/UPopup.vue";
const show = ref(false)
function onClose(){
    show.value = false
}
</script>
<template>
    <button @click="show = !show">显示</button>
  <UPopup :show="show" @on-close="onClose">
    <view class="w-20 h-20 bg-gray-100 flex items-center justify-center">关闭</view>
  </UPopup>
</template>
<style></style>
