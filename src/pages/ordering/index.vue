<script setup lang='ts'>
import { ref } from 'vue';
import UTabs from '@/components/common/UTabs/index.vue'
import UMap from './components/UMap.vue'
import UList from './components/UList.vue'
const index = ref(0)
const tabData = ref([
    {
        key:'1',
        label:'附件门店'
    },
    {
        key:'2',
        label:'常去门店'
    },
])
function onChange(data:any){
    console.log(data);
}
const mapShow = ref(true)
</script>
<template>
<view class="w-full flex flex-col gap-3 bg-gray-50">
    <view class="w-full h-10">
        <u-tabs :data="tabData" v-model:index="index" @on-change="onChange" />
    </view>
    <view class="w-full flex flex-col bg-white">
        <u-map v-if="mapShow" />
        <view class="flex items-center justify-center py-2 shadow shadow-md shadow-gray-100"
        @click="mapShow = !mapShow"
        >
            <text class="text-gray-500">收起地图</text>
        </view>
    </view>
    <view>
        <u-list />
    </view>
</view>
</template>
<style>

</style>