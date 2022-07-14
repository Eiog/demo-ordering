<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {useAppStore} from '@/store'
import { userApi } from "./api";
const appStore = useAppStore()
onLaunch(() => {
  if(appStore.token){
    userApi.status(appStore.token).then(res=>{
      appStore.userInfo = res.userInfo
      appStore.token = res.token
    }).catch(()=>{
      appStore.$reset()
    })
  }
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/* #ifdef H5 */
body::-webkit-scrollbar,
div::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
/* #endif */
view,div{
	box-sizing: border-box;
}
page {
  height: 100%;
  box-sizing: border-box;
}
</style>
