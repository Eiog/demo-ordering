<script setup lang="ts" name="UPopup">
import { ref, watch, computed } from "vue";
import UTransition from "./UTransition.vue";
enum Mode {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
  center = "center",
}
type Props = {
  show: boolean;
  mask?: boolean;
  mode?: `${Mode}`;
  duration?: number;
  zIndex?: number;
  dark?: boolean;
  blur?: boolean;
};
type Emit = {
  (e: "onShow"): void;
  (e: "onClose"): void;
};
const props = withDefaults(defineProps<Props>(), {
  mask: true,
  mode: "center",
  duration: 300,
  zIndex: 9,
  dark: false,
  blur: true,
});
const emit = defineEmits<Emit>();

const defaultStyle = ref(
  props.mask
    ? {
        background: props.dark
          ? `rgba(255,255,255,${0.3})`
          : `rgba(0,0,0,${0.3})`,
      }
    : {}
);
const bandStyle = ref({
  ...defaultStyle.value,
});
function handlerOnClose() {
  if (props.show) emit("onClose");
}
const modeFlex = computed(()=>{
  if(props.mode==='top') return 'start'
  if(props.mode==='bottom') return 'end'
  return 'center'
})
const modeTransition = computed(()=>{
  if(props.mode==='top') return 'fade-down'
  if(props.mode==='bottom') return 'fade-up'
  return 'zoom'
})
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
    }
  }
);
</script>
<template>
  <UTransition
    :show="props.show"
    :duration="props.duration"
    @on-click="handlerOnClose"
    :view-style="{
      background: props.dark ? `rgba(255,255,255,.3)` : `rgba(0,0,0,.3)`,
      position: 'fixed',
      inset: 0,
    }"
  >
  </UTransition>
  <view class="fixed left-50% top-50% -translate-50% w-90%" :class="[props.mode==='top'?'w-full !top-0 translate-y-0!':'',props.mode==='bottom'?'w-full !bottom-0 translate-y-0!':'']">

  
  <UTransition
    :show="props.show"
    :duration="props.duration"
    :mode="modeTransition"
    :view-style="{
      width:'100%'
    }"
  >
    <view class="popup-content" :class="props.mode" :style="{ zIndex: props.zIndex}" >
      <view class="flex-1">
        <slot></slot>
      </view>
      <view class="border-t border-t-gray-100 flex items-center">
        <text class="flex-1 flex items-center justify-center  py-4 active:bg-gray-100">确定</text>
        <text class="flex-1 flex items-center justify-center py-4 active:bg-gray-100">取消</text>
      </view>
    </view>
  </UTransition>
  </view>
</template>
<style scoped>
.popup-content {
  width: 100%;
  height: 200px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.popup-content.bottom {
  width: 100%;
  border-radius: 20px 20px 0 0;
}
.popup-content.top {
  width: 100%;
  border-radius: 0 0 20px 20px;
}
</style>
