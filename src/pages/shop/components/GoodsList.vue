<script setup lang="ts" name="GoodsList">
import { ref, onMounted, getCurrentInstance } from "vue";
import { onReady } from "@dcloudio/uni-app";
type Props = {
  data: SHOP.GoodsClassify[];
  index: number;
};
type Emit = {
  (e: "onSelect", data: SHOP.Goods): SHOP.Goods;
  (e: "update:index", index: number): number;
  (e: "onScroll", index: number): number;
};
const $this = getCurrentInstance();
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const scrollWrapHeight = ref(0);
async function getScrollWrapHeight() {
  uni
    .createSelectorQuery()
    .in($this)
    .select("#list-scroll-wrap")
    .boundingClientRect((res) => {
      scrollWrapHeight.value = Math.round(res.height!);
    })
    .exec();
}

const itemBoundingList = ref<number[]>([]);
async function getItemBounding() {
  uni
    .createSelectorQuery()
    .in($this)
    .selectAll(".anchor-title")
    .boundingClientRect((data) => {
      const datas = data as unknown as UniApp.NodeInfo[];
      itemBoundingList.value = datas.map((item, index, arr) => {
        return Math.round(item.top! - arr[0].top!);
      });
    })
    .exec();
}

const placeholderHeight = ref(0)
async function getPlaceholderHeight(){
  placeholderHeight.value = scrollWrapHeight.value -33 - props.data[props.data.length-1].goods.length*116
}

const isInit = ref(false);
async function init() {
  await getScrollWrapHeight();
  await getItemBounding();
  await getPlaceholderHeight()
  isInit.value = true;
}

const scrollTop = ref<number>(0);
function resetTop(val: number) {
  scrollTop.value = itemBoundingList.value[val];
}

onMounted(() => {
  watch(
    () => props.data,
    (val) => {
      if (val!.length > 0) {
        nextTick(() => {
          if (!isInit.value) init();
        });
      }
    }
  );
});

onMounted(() => {
  watch(
    () => props.index,
    (val) => {
      if (isInit) resetTop(val);
    }
  );
});

function onScroll(e: any) {
  const Top = e.detail.scrollTop;
  for (let i = 0; i < itemBoundingList.value.length; i++) {
    if (
      !itemBoundingList.value[i + 1] ||
      (Top >= itemBoundingList.value[i]! &&
        Top < itemBoundingList.value[i + 1]!)
    ) {
      currentIndex.value = i;
      return;
    }
  }
}

const currentIndex = ref(0);
watch(currentIndex, (newValue) => {
  emit("onScroll", newValue);
});
</script>
<template>
  <scroll-view
    scroll-y
    class="w-full h-full"
    id="list-scroll-wrap"
    :scroll-with-animation="true"
    :scroll-top="scrollTop"
    @scroll="onScroll"
  >
    <view class="w-full flex flex-col min-w-0">
      <view v-for="(item, index) in props.data" :key="index">
        <view
          class="w-full py-2 flex items-center gap-1 anchor-title"
          :id="'anchor' + item.id"
        >
          <text class="w-2 h-4 rounded-md bg-red-600"></text>
          <text class="leading-none">{{ item.name }}</text>
        </view>
        <view
          class="w-full min-h-28 flex items-start gap-1 p-1 min-w-0"
          v-for="(_item, _index) in item.goods"
          :key="_index"
        >
          <view class="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
            <image class="w-full h-full" :src="_item.cover" mode="aspectFill" />
          </view>
          <view class="flex-1 flex flex-col min-w-0">
            <text class="font-bold">{{ _item.name }}</text>
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
      <view :style="{height:placeholderHeight+'px'}"></view>
    </view>
  </scroll-view>
</template>
<style scoped lang="less"></style>
