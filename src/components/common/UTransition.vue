<script setup lang="ts" name="UTransition">
import { ref, watch, computed, nextTick } from "vue";
import type { CSSProperties } from "vue";
enum Mode {
  fade = "fade",
  fadeUp = "fade-up",
  fadeDown = "fade-down",
  zoom = "zoom",
}
type Props = {
  show: boolean;
  mode?: `${Mode}`;
  duration?: number;
  viewStyle?: CSSProperties;
};
type Emit = {
  (e:'onClick'):void
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  mode: "fade",
  duration: 300,
});
const emit = defineEmits<Emit>()
const defaultStyle = computed(() => {
  const style: CSSProperties = {
    transitionDuration: `${props.duration}ms`,
  };
  return style;
});
const bandClass = ref<`${Mode}` | unknown>(props.mode);
const viewShow = ref(false);
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      viewShow.value = true;
      setTimeout(() => {
        bandClass.value = "";
      }, 50);
    } else {
      bandClass.value = props.mode;
      setTimeout(() => {
        viewShow.value = false;
      }, props.duration);
    }
  },
  { immediate: true }
);
function onClick(){
  emit('onClick')
}
</script>
<template>
  <view
    class="transition"
    :style="{...defaultStyle,...props.viewStyle}"
    :class="bandClass"
    v-if="viewShow"
    @click.stop="onClick()"
  >
   <slot></slot>
  </view>
</template>
<style scoped>
.transition {
  width: 100%;
  height: 100%;
  transition-property: all;
  transition-timing-function: ease-in-out;
  visibility: visible;
  opacity: 1;
}
.fade {
  visibility: hidden;
  opacity: 0;
}
.zoom {
  visibility: hidden;
  opacity: 0;
  transform: scale(0.8);
}
</style>
