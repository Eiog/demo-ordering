<script setup lang="ts" name="GoodsList">
import { ref } from "vue";
type Data = {
  id: number;
  name: string;
  subtitle: string;
  cover: string;
  oldPrice: number;
  price: number;
  tag: string[];
};
type Props = {
  data: Data[];
};
type Emit = {
    (e:'scrolltoupper',data:Data):Data
    (e:'scrolltolower',data:Data):Data
    (e:'onSelect',data:Data):Data
}
const props = defineProps<Props>();
const emit= defineEmits<Emit>()
function scrolltolower(e:any){
    console.log(e);
}
</script>
<template>
  <view class="w-full h-full">
    <scroll-view scroll-y class="w-full h-full" :scroll-with-animation="true" @scrolltoupper="" @scrolltolower="scrolltolower">
      <view>
        <view
          class="flex items-center gap-1 p-1"
          v-for="(item, index) in props.data"
          :key="index"
        >
          <view class="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
            <image class="w-full h-full" :src="item.cover" mode="aspectFill" />
          </view>
          <view class="flex-1 flex flex-col">
            <text class="font-bold">{{ item.name }}</text>
            <text class="text-xs text-gray-500 mb-auto">{{
              item.subtitle
            }}</text>
            <view class="w-full flex items-center">
              <view class="flex-1 flex flex-col">
                <view class="flex items-baseline gap-1">
                  <text class="text-xl text-red-600">{{ item.price }}</text>
                  <text class="text-gray-500 line-through">{{
                    item.oldPrice
                  }}</text>
                </view>
                <view class="flex items-center">
                  <text
                    class="text-xs text-red-600 leading-none"
                    v-for="(_item, index) in item.tag"
                    :key="index"
                    >{{ _item }}</text
                  >
                </view>
              </view>
              <view
                class="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white leading-normal text-xl"
                @click="emit('onSelect',item)"
                >
                <text class="i-ic-round-plus"></text>
                </view
              >
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<style scoped lang="less"></style>
