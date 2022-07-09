<script setup lang="ts" name="UMap">
import { ref, onMounted, getCurrentInstance } from "vue";
import { onReady } from "@dcloudio/uni-app";
const $this = getCurrentInstance();
const mapRef = ref<UniApp.MapContext>();
type Location = {
  longitude: number;
  latitude: number;
};
const location = ref<Location>({ longitude: 0, latitude: 0 });
function getLocation() {
  uni.getLocation({
    type: "gcj02 ",
    success: (res) => {
      location.value.latitude = res.latitude;
      location.value.longitude = res.longitude;
    },
    fail: (err) => {
      // console.log(err);
    },
  });
}
function initMap() {
  getLocation();
  mapRef.value = uni.createMapContext("map", $this);
  uni.chooseLocation({latitude:location.value.latitude,longitude:location.value.longitude,success:res=>{
    console.log(res);
    
  },fail:err=>{
    console.log(err);
    
  }})
}
function init() {
  initMap();
}
onMounted(() => {
  init();
});
</script>
<template>
  <view class="w-full h-60">
    <map
      id="map"
      class="w-full h-full"
      :show-location="true"
      :latitude="location.latitude"
      :longitude="location.longitude"
    ></map>
  </view>
</template>
<style scoped lang="less"></style>
