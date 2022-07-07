<script setup lang="ts" name="UTabs">
import { getCurrentInstance, ref, onMounted, watch, computed } from "vue";
type Props = {
  data?: SHOP.GoodsClassify[];
  index: number;
  color?: string;
};
type Change = {
  item: SHOP.GoodsClassify;
  index: number;
};
type Emit = {
  (e: "update:index", index: number): number;
  (e: "onChange", { item, index }: Change): void;
};
const $this = getCurrentInstance();
const props = withDefaults(defineProps<Props>(), {
  color: "#e32636",
});
const emit = defineEmits<Emit>();
function onChange(item: SHOP.GoodsClassify, index: number) {
  emit("update:index", index);
  emit("onChange", { item, index });
}

const scrollWrapHeight = ref(0);
async function getScrollWrapHeight() {
  uni
    .createSelectorQuery()
    .in($this)
    .select("#scroll-wrap")
    .boundingClientRect((res) => {
      scrollWrapHeight.value = Math.round(res.height!);
    })
    .exec();
}

const tabItemBoundingList = ref<number[]>([]);
async function getTabItemBoundingList() {
  uni
    .createSelectorQuery()
    .in($this)
    .selectAll(".tab-item")
    .boundingClientRect((res) => {
      console.log(res);
      const _res = res as unknown as UniApp.NodeInfo[];
      tabItemBoundingList.value = _res.map((item, index, arr) => {
        return Math.round(item.top! - arr[0].top!);
      });
    })
    .exec();
}
const isInit = ref(false);
async function init() {
  await getScrollWrapHeight();
  await getTabItemBoundingList();
  isInit.value = true;
}
const scrollTop = ref(0);
function resetTop(index: number) {
  scrollTop.value = tabItemBoundingList.value[index];
}

onMounted(() => {
  watch(
    () => props.data,
    (val) => {
      if (val && val?.length > 0) {
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
</script>
<template>
  <scroll-view
    class="w-full h-full"
    id="scroll-wrap"
    scroll-y
    scroll-with-animation
    :scroll-top="scrollTop"
  >
    <view
      class="w-full h-14 p-1 tab-item"
      v-for="(item, index) in props.data"
      :key="index"
      :class="props.index === index ? 'bg-white' : ''"
      @click="onChange(item, index)"
    >
      <view class="w-full h-full flex items-center gap-1">
        <view
          class="w-2 h-4 rounded-full opacity-0 scale-0 transition-all"
          :class="props.index === index ? '!opacity-100 !scale-100' : ''"
          :style="{ background: props.color }"
        ></view>
        <text
          class="truncate"
          :style="props.index === index ? { color: props.color } : ''"
          >{{ item.name }}</text
        >
      </view>
    </view>
  </scroll-view>
</template>
<style></style>
