<script setup lang="ts" name="UPopup">
import { ref, watch,nextTick } from "vue";
type Props = {
  data?: Shop.ShopList;
  show: boolean;
};
type Emit = {
  (e: "onClose"): void;
};
const props = defineProps<Props>();
const emit = defineEmits<Emit>();
function goShop() {
  uni.navigateTo({ url: `/pages/shop/index?id=${props.data?.id}` });
  emit("onClose");
}
function onClose(e:any) {
    if(e.target.id!==props.data?.id) return
    emit("onClose");
}
const isShow = ref(false);
const bandClass = ref(false);
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      isShow.value = true;
      setTimeout(() => {
        nextTick(()=>{
        bandClass.value = true;
      })
      }, 50);
    } else {
      bandClass.value = false;
      setTimeout(() => {
        isShow.value = false;
      }, 300);
    }
  }
);
</script>
<template>
  <view
    class="fixed w-full h-full left-0 top-0 bg-black bg-opacity-30 backdrop-blur-sm opacity-0 invisible transition-all z-10"
    :id="props.data?.id"
    :class="props.show ? 'opacity-100 !visible' : ''"
    @click.stop="onClose($event)"
  >
    <view
      class="fixed left-0 bottom-0 w-full rounded-t-2xl overflow-hidden bg-white scale-95 invisible opacity-0 translate-y-100 transition-all duration-300"
      :class="props.show?'!translate-y-0 !scale-100 !visible !opacity-100 ':''"
    >
      <view
        class="w-full min-h-14 flex items-center px-3 bg-red-50 text-red-700 truncate"
      >
        <text class="truncate">{{ props.data?.notice }}</text>
      </view>
      <view class="w-full flex-1 flex flex-col gap-2 px-3 pb-2">
        <view class="w-full flex items-center">
          <view class="flex-1 flex flex-col gap-1">
            <text class="font-bold">{{ props.data?.name }}</text>
            <text class="text-sm">{{ props.data?.addr }}</text>
          </view>
          <view class="">
            <text>距离400m</text>
          </view>
        </view>
        <view class="w-full h-46 rounded-md bg-gray-100"> </view>
        <view
          class="w-full h-10 flex items-center justify-center text-white bg-red-500 rounded-md"
          @click="goShop"
        >
          去点单
        </view>
        <!-- #ifdef H5 -->
        <view class="w-full h-12"></view>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>
<style scoped lang="less"></style>
