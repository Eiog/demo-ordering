<script setup lang="ts" name="UMap">
import { ref, onMounted, getCurrentInstance, watch } from "vue";
type Location = {
  longitude: number;
  latitude: number;
};
type Props = {
  location?: Location;
};
const props = defineProps<Props>();

const $this = getCurrentInstance();
const mapRef = ref<UniApp.MapContext>();
const location = ref<Location>({ latitude: 39.909, longitude: 116.39742 });
watch(
  () => props.location,
  (val) => {
    if (val) location.value = val;
  }
);
async function getLocation() {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  await uni.getLocation({
    type: "gcj02",
    success: (res) => {
      location.value = res;
    },
    fail: (err) => {
      console.log(err);
    },
    complete: () => {
      uni.hideLoading();
    },
  });
}
async function resetLocation() {
  if (mapRef.value) {
    await getLocation()
    mapRef.value.moveToLocation({
      latitude: location.value.latitude,
      longitude: location.value.longitude,
      success: (res) => {
        console.log(res);
      },
    });
  }
}
function addMarkers(){
  const marker = {
    id:1,
    iconPath:'/static/image/marker-icon.png',
    width:50,
    height:50,
    joinCluster: true, // 指定了该参数才会参与聚合
    label: {
      width: 50,
      height: 30,
      borderWidth: 1,
      borderRadius: 10,
      bgColor: '#ffffff'
    }
  }
  const location = [
    {
      latitude: 45.70847,
      longitude: 126.66287
    },
    {
      latitude: 45.70105238046894,
      longitude: 126.687181542511
    },
    {
      latitude: 45.693468,
      longitude: 126.694691
    },
    {
      latitude: 45.70847,
      longitude: 126.66287
    }
  ]
  const markers = []
  location.forEach((item,index)=>{
    const _marker = Object.assign({},marker,item)
    _marker.id = index+1
    _marker.label.content  = `label${index+1}`
    markers.push(_marker)
  })
  mapRef.value.addMarkers({
    markers,
    clear:false,
    complete:res=>{
      console.log(res);
      
    }
  })
}
function initMap() {
  if (props.location) {
    location.value = props.location;
  } else {
    getLocation();
  }
  mapRef.value = uni.createMapContext("map1", $this);
  mapRef.value.addCustomLayer({
    layerId: "location-btn",
    success: (res) => {
      console.log(res);
    },
  });
  addMarkers()
  mapRef.value.on('markerClusterCreate', (res) => {
    console.log(res);
  })
  mapRef.value.on('markerClusterClick', (res) => {
    console.log(res);
    
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
    <map
      id="map1"
      class="fulled fulled-height"
      :show-location="true"
      :latitude="location.latitude"
      :longitude="location.longitude"
    >
      <view
        id="location-btn"
        class="z-999 w-8 h-8 absolute bottom-8 right-3 rounded-full bg-white backdrop-blur-md border-opacity-60 shadow-md flex items-center justify-center"
        @click="resetLocation"
      >
        <text class="i-ic-outline-my-location text-xl"></text>
      </view>
    </map>
</template>
<style scoped lang="less"></style>
