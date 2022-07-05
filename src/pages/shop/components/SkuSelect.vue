<script setup lang="ts" name="SkuSelect">
import {useShopStore} from '@/store'
type Props = {
  data?: SHOP.Goods;
};
type Emit = {
  (e: "onClose"): void;
  (e:'onChecked',data:SHOP.Sku['items']):SHOP.Sku['items']
};
const shopStore = useShopStore()
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const skuData = ref<SHOP.Sku[]>(initSkuData(props.data!.sku))

function initSkuData(skuData:SHOP.Sku[]):SHOP.Sku[]{
    return skuData.map((item)=>{
        item.items.map((it,index)=>{
            if(index===0){
              it.checked = true
              it.disabled = false 
            return it
            }
            it.checked = false
            it.disabled = false 
            return it
        })
        return item
    }) as unknown as SHOP.Sku[]
}
function onClose(e: any) {
  if (e.target.id != "skuSelectWrap") return;
  emit("onClose");
}
function handlerClick(index:any,sku_index:any,checked?:boolean,disabled?:boolean){
    if(disabled) return
    if(checked){
        return skuData.value[index].items[sku_index].checked = false
    }
    skuData.value[index].items.forEach(item=>item.checked = false)
    skuData.value[index].items[sku_index].checked = true
}
const selectedSku = computed(()=>{
  let skus:SHOP.Sku['items'] = []
  skuData.value.forEach(item => {
    item.items.forEach(_item=>{
      if(_item.checked) skus.push(_item)
    })
  });
  return skus
})
function handleAddCard(){
  if(selectedSku.value.length!=props.data?.sku.length) return
  emit('onChecked',selectedSku.value)
}
</script>
<template>
  <view
    id="skuSelectWrap"
    class="absolute w-full h-full px-10 flex items-center justify-center left-0 top-0 bg-black bg-opacity-30 backdrop-blur-sm animate-fade-in animate-duration-300"
    @click.stop="onClose($event)"
  >
    <view class="w-full flex flex-col gap-2 p-5 min-h-20 bg-white rounded-2xl">
      <view class="flex gap-2">
        <view class="w-28 h-28 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
            <image
            class="w-full h-full"
                :src="props.data?.cover"
                mode="aspectFill"
            />
        </view>
        <view class="flex flex-col gap-1">
          <text class="font-bold">{{ props.data?.name }}</text>
          <text class="text-sm text-gray-500">{{ props.data?.subtitle }}</text>
        </view>
      </view>
      <view class="felx flex-col">
        <view
          class="flex flex-col gap-3"
          v-for="(item, index) in skuData"
          :key="index"
        >
          <view class="flex items-center gap-1">
            <view class="w-1 h-3 bg-gray-300 rounded-full"></view>
            <text class="text-gray-500">{{ item.name }}</text>
          </view>
          <view class="flex items-center flex-wrap gap-3">
            <view
              class="w-30% border border-gray-100 rounded-md text-sm flex items-center justify-center py-1"
              v-for="(sku_item, sku_index) in item.items"
              :key="sku_index"
                :class="sku_item.checked?'bg-red-500 text-white':'',sku_item.disabled?'bg-grey-100':''"
              @click="handlerClick(index,sku_index,sku_item.checked,sku_item.disabled)"
            >
              {{sku_item.name}}
            </view>
          </view>
        </view>
        <view class="flex items-center mt-2 border-t border-t-gray-100 pt-2">
          <view class="flex-1 flex items-baseline gap-2">
            <text class="font-bold text-xl">{{props.data?.price}}</text>
            <text class="text-base text-gray-500 line-through">{{props.data?.oldPrice}}</text>
          </view>
          <view
            class="px-2 py-1 bg-red-600 rounded-md text-white leading-normal"
            @click="handleAddCard"
            >加入购物车</view
          >
        </view>
      </view>
    </view>
    <view> </view>
  </view>
</template>
<style scoped lang="less"></style>
