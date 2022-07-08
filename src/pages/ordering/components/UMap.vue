<script setup lang="ts" name="Map">
import { ref,onMounted,getCurrentInstance } from "vue";
const $this = getCurrentInstance()
const mapRef = ref<UniApp.MapContext>()
const location = ref({longitude:0,latitude:0})
function initMap(){
  uni.getLocation({
	type: 'wgs84',
	success: (res)=> {
		location.value = {longitude:res.latitude,latitude:res.latitude}
	}
  });
  mapRef.value = uni.createMapContext("map",$this)
  mapRef.value.getCenterLocation({
    success:(res=>{
      console.log(res);
    })
  })
}
function init(){
  initMap()
}
onMounted(()=>{
  init()
})
</script>
<template>
  <view class="w-full h-60">
    <map
      id="map"
      ref="mapRef"
      class="w-full h-full"
      :show-location="true"
      :latitude="location.latitude"
      :longitude="location.longitude"
    ></map>
  </view>
</template>
<style scoped lang="less"></style>
