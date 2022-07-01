<script setup lang="ts" name="SkuSelect">
type Data = {
  id: number;
};
type Props = {};
type Emit = {
    (e:'onClose',data:any):void
}
const emit = defineEmits<Emit>()
</script>
<template>
  <view
    class="absolute w-full h-full px-10 flex items-center justify-center left-0 top-0 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in animate-duration-300"
    @click="emit('onClose',false)"
  >
  <view class=" w-full flex flex-col gap-2 p-5 min-h-20 bg-white rounded-2xl">
    <view class="flex gap-2">
        <view class="w-28 h-28 rounded-md bg-gray-100"></view>
        <view class="flex flex-col">
            <text class="font-bold">森林莓果</text>
            <text class="text-sm text-gray-500">大自然的味道</text>
        </view>
    </view>
    <view class="felx flex-col">
        <view class="flex flex-col gap-3">
            <view class="flex items-center gap-1">
                <view class="w-1 h-3 bg-gray-300 rounded-full"></view>
                <text class="text-gray-500 ">温度</text>
            </view>
            <view class="flex items-center flex-wrap gap-3">
                <view class="w-30%  border border-gray-100 rounded-md text-sm flex items-center justify-center py-1"
                v-for="(item, index) in 5" :key="index"
                >
                    正常
                </view>
            </view>
            <view class="flex items-center  mt-2 border-t border-t-gray-100 pt-2">
                <view class="flex-1">
                    <text class="font-bold text-xl">5</text>
                </view>
                <view class="px-2 py-1 bg-red-600 rounded-md text-white leading-normal">加入购物车</view>
            </view>
        </view>
    </view>
  </view>
  <view>
    
  </view>
  </view>
</template>
<style scoped lang="less"></style>
