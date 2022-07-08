<script setup lang="ts" name="UMap">
import { ref, onMounted, getCurrentInstance } from "vue";
import { onReady } from "@dcloudio/uni-app";
const $this = getCurrentInstance()
const mapRef = ref<UniApp.MapContext>();
type Location = {
  longitude: number;
  latitude: number;
};
const location = ref<Location>({ longitude: 0, latitude: 0 });
async function getLocation():Promise<Location>{
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
      success: (res) => {
        return resolve({ longitude: res.latitude, latitude: res.latitude });
      },
      fail:()=>{
        return reject()
      },
      complete:()=>{
        return reject()
      }
    });
  });
}
async function initMap() {
  location.value = await getLocation()
  const myMap = uni.createMapContext("my-map", $this)
  myMap.getCenterLocation({
    success:(res)=>{
      console.log(res);
      
    }
  })
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
      id="my-map"
      class="w-full h-full"
      :show-location="true"
      :latitude="location.latitude"
      :longitude="location.longitude" 
    ></map>
  </view>
</template>
<style scoped lang="less"></style>
