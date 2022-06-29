<script setup lang="ts" name="Map">
import { ref } from "vue";
const mapData = ref({
  id: 1,
  latitude: 39.909,
  longitude: 116.39742,
  markers: [
    {
      latitude: 39.909,
      longitude: 116.39742,
      iconPath: "/static/image/location.png",
    },
  ],
});
uni.getLocation({
  type: "Wwgs84",
  success: (res) => {
    const data = {
        id:1,
        latitude:res.latitude,
        longitude:res.longitude,
        markers:[{
            id:12,
            latitude:res.latitude,
            longitude:res.longitude,
            iconPath: "/static/image/location.png",
            width:20,
            height:20
        }]
    }
    mapData.value = data
    
  },
});
</script>
<template>
  <view class="w-full h-60">
    <map
      class="w-full h-full"
      :latitude="mapData.latitude"
      :longitude="mapData.longitude"
      :markers="mapData.markers"
    ></map>
  </view>
</template>
<style scoped lang="less"></style>
