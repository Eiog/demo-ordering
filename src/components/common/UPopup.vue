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
  zIndex: 99,
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
    :view-style="{background:props.dark?`rgba(255,255,255,.3)`:`rgba(0,0,0,.3)`,position:'fixed',inset:0}"
    @on-click="handlerOnClose"
  >
  </UTransition>
  <UTransition
    :show="props.show"
    :duration="props.duration"
    mode="zoom"
    :view-style="{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}"
  >
    <view class="popup-content" :style="{zIndex:props.zIndex}">
      111
    </view>
  </UTransition>
</template>
<style scoped >
.popup-content{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 90%;
  height: 200px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}
</style>
