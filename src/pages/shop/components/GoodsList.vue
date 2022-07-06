<script setup lang="ts" name="GoodsList">
type Props = {
  data?: SHOP.GoodsClassify[];
  anchor?: number | string;
};
type Emit = {
  (e: "onSelect", data: SHOP.Goods): SHOP.Goods;
};
const props = defineProps<Props>();
const emit = defineEmits<Emit>();
function scrolltolower(e: any) {
  console.log(e);
}
</script>
<template>
  <view class="w-full h-full">
    <scroll-view
      scroll-y
      class="w-full h-full"
      :scroll-with-animation="true"
      :scroll-into-view="'anchor'+props.anchor"
      @scrolltoupper=""
      @scrolltolower="scrolltolower"
    >
      <view class="w-full flex flex-col min-w-0">
        <view v-for="(item, index) in props.data" :key="index">
          <view
            class="w-full py-2 flex items-center gap-1 "
            :class="item.id===props.anchor?'absolute':''"
            :id="'anchor' + item.id"
          >
            <text class="w-2 h-4 rounded-md bg-red-600"></text>
            <text class="leading-none">{{ item.name }}</text>
          </view>
          <view
            class="w-full flex items-center gap-1 p-1 min-w-0"
            v-for="(_item, _index) in item.goods"
            :key="_index"
          >
            <view class="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
              <image
                class="w-full h-full"
                :src="_item.cover"
                mode="aspectFill"
              />
            </view>
            <view class="flex-1 flex flex-col min-w-0">
              <text class="font-bold">{{ item.name }}</text>
              <text class="text-xs text-gray-500 mb-auto">{{
                _item.subtitle
              }}</text>
              <view class="flex items-center flex-1 min-w-0">
                <view class="flex-1 flex flex-col min-w-0">
                  <view class="flex items-baseline gap-1">
                    <text class="text-xl text-red-600">{{ _item.price }}</text>
                    <text class="text-gray-500 line-through">{{
                      _item.oldPrice
                    }}</text>
                  </view>
                  <view class="flex items-center gap-1">
                    <text
                      class="text-xs text-red-600 leading-none truncate"
                      v-for="(__item, __index) in _item.tag"
                      :key="__index"
                      >{{ __item }}</text
                    >
                  </view>
                </view>
                <view
                  class="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white leading-normal text-xl"
                  @click="emit('onSelect', _item)"
                >
                  <text class="i-ic-round-plus"></text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<style scoped lang="less"></style>
