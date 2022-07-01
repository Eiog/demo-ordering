<script setup lang="ts" name="Transition">
import { ref,watch,computed } from 'vue';
enum Mode {
  fade = "fade",
  fadeUp = "fade-up",
}
type Props = {
  show: boolean;
  mode?: keyof typeof Mode;
  duration?: number;
};
const props = withDefaults(defineProps<Props>(),{
  show:false,
  mode:'fade',
  duration:300
})
const durationClass = computed(()=>{
  return "animate-duration-"+props.duration
})
const viewShow =ref(false)
watch(()=>props.show,newValue=>{
  if(newValue){
    viewShow.value = true
  }else{
    setTimeout(() => {
      viewShow.value = false
    }, props.duration);
  }
},{immediate:true})

</script>
<template>
  <view :style="{transition:'all',transitionDuration:`${props.duration}ms`,opacity:props.show?'100':'0'}" v-if="viewShow">
    <slot></slot>
  </view>
</template>
<style scoped lang="less"></style>
