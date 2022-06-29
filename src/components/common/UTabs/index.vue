<script setup lang="ts" name="UTabs">
type TabData = {
  key:string
  label:string
}
type Props = {
  data: TabData[];
  index: number;
  color?: string;
};
type Emit = {
  (e: "update:index", index: number): number;
  (e:'onChange',data:TabData):TabData
};
const props = withDefaults(defineProps<Props>(), {
  color: "#e32636",
});
const emit = defineEmits<Emit>();
function onChange(item:TabData,index:number){
  emit('update:index', index)
  emit('onChange',item)
}
</script>
<template>
  <view class="w-full h-full overflow-auto">
    <view class="h-full w-auto flex items-center justify-start">
      <view
        class="h-full flex flex-shrink-0 px-3"
        v-for="(item, index) in data"
        :key="index"
        @click="onChange(item,index)"
      >
        <view class="w-full h-full flex items-center justify-center relative">
          <text
            style="white-space: nowrap"
            :style="props.index === index ? { color: color } : {}"
            >{{ item.label }}</text>
          <view
            class="absolute left-1/2 bottom-0 w-10/12 h-0.5 rounded-full bg-gray-600 opacity-0 -translate-x-2/3 transition-all"
            :class="props.index === index ? 'opacity-100 !-translate-x-1/2' : ''"
            :style="props.index === index ? { background: color } : {}"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>
<style></style>
