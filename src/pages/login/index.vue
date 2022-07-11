<script setup lang="ts" name="Login">
import http from "@/http";
import {userApi} from '@/api'
import { useAppStore } from "@/store";
const appStore = useAppStore()
const AppID = ref("wx2e18528c7c294e28");
const AppSecret = ref("328a4712a27c96d88eb42b5c56812eef");

const getCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: (res) => resolve(res.code),
      fail: (err) => reject(),
    });
  });
};
const getOpenId = (
  appid: string,
  secret: string,
  js_code: string
): Promise<{ openid: string; session_key: string }> => {
  return new Promise((resolve, reject) => {
    const data = {
      appid: appid,
      secret: secret,
      js_code: js_code,
      grant_type: "authorization_code",
    };
    uni.request({
      url: `https://api.weixin.qq.com/sns/jscode2session`,
      data: data,
      success: (res) => resolve(res.data as any),
      fail: (err) => reject(),
    });
  });
};
const handleLogin = async () => {
    const code = await getCode()
    const {openid,session_key} = await getOpenId(AppID.value,AppSecret.value,code)
    userApi.login(openid,session_key).then(res=>{
      appStore.userInfo = res.userInfo
      appStore.token = res.token
      uni.navigateBack({ delta: 1 })
      uni.showToast({title:'登录成功',icon:'success'})
    }).catch(()=>{
      uni.showToast({title:'出错啦',icon:'error'})
    })
};
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      desc: "用于维护个人信息",
      success: (res) => resolve(res),
      fail: (err) => reject(),
    });
  });
};
const onLogin = (e) => {
  console.log(e);
};
</script>
<template>
  <view class="w-full h-full flex items-center justify-center">
    <button
      class=""
      type="primary"
      open-type="llogin"
      @click="handleLogin"
      @login="onLogin"
    >
      微信授权登录
    </button>
  </view>
</template>
<style scoped lang="less"></style>
