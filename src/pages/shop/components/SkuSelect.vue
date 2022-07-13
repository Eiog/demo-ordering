<script setup lang="ts" name="SkuSelect">
import { useShopStore } from "@/store";
type Props = {
  data?: SHOP.Goods;
  show: boolean;
};
type Emit = {
  (e: "onClose"): void;
  (e: "onChecked", data: SHOP.Sku["items"]): SHOP.Sku["items"];
};
const shopStore = useShopStore();
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const skuData = ref<SHOP.Sku[]>();

function initSkuData(skuData: SHOP.Sku[]): SHOP.Sku[] {
  return skuData.map((item) => {
    item.items.map((it, index) => {
      if (index === 0) {
        it.checked = true;
        it.disabled = false;
        return it;
      }
      it.checked = false;
      it.disabled = false;
      return it;
    });
    return item;
  }) as unknown as SHOP.Sku[];
}
function onClose(e: any) {
  emit("onClose");
}
function handlerClick(
  index: number,
  sku_index: number,
  checked?: boolean,
  disabled?: boolean
) {
  if (disabled) return;
  if (checked) {
    return (skuData.value![index].items[sku_index].checked = false);
  }
  skuData.value![index].items.forEach((item) => (item.checked = false));
  skuData.value![index].items[sku_index].checked = true;
}
const selectedSku = computed(() => {
  let skus: SHOP.Sku["items"] = [];
  skuData.value?.forEach((item) => {
    item.items.forEach((_item) => {
      if (_item.checked) skus.push(_item);
    });
  });
  return skus;
});
const skuInCart = computed(() => {
  let has = false;
  let count = 0;
  shopStore.shopCart?.forEach((item) => {
    const _has = item.sku.every((val, i) => {
      return val.id === selectedSku.value[i].id;
    });
    if (_has) {
      has = _has;
      count = item.count;
    }
  });
  return { has, count };
});

function handleAddCard() {
  if (selectedSku.value.length != props.data?.sku.length) return;
  emit("onChecked", selectedSku.value);
}
watch(()=>props.data,val=>{
  if(val) skuData.value = initSkuData(val.sku)
})
</script>
<template>
  <view class="">
    <view
      class="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 opacity-0 invisible transition-all z-98"
      :class="props.show ? '!visible !opacity-100' : ''"
      @click="onClose"
    ></view>
    <view
    v-if="props.show"
      class="fixed w-80% h-60% flex flex-col gap-1 left-50% top-50% -translate-x-50% -translate-y-50% bg-white rounded-xl p-3 z-99"
    >
      <view class="flex gap-2">
        <view
          class="w-28 h-28 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center"
        >
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
      <view class="flex-1 min-h-0 ">
        <scroll-view scroll-y class="w-full h-full">
        <view
          class="flex flex-col gap-1 mt-2"
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
              :class="
                sku_item.checked ? 'bg-red-500 text-white' : '',
                sku_item.disabled ? 'bg-grey-100' : ''
              "
              @click="
                handlerClick(
                  index,
                  sku_index,
                  sku_item.checked,
                  sku_item.disabled
                )
              "
            >
              {{ sku_item.name }}
            </view>
          </view>
        </view>
        </scroll-view>
      </view>
      <view class="flex items-center border-t border-t-gray-100 pt-2">
          <view class="flex-1 flex items-baseline gap-2">
            <text class="font-bold text-xl">{{ props.data?.price }}</text>
            <text class="text-base text-gray-500 line-through">{{
              props.data?.oldPrice
            }}</text>
          </view>
          <view class="flex items-center gap-3" v-if="skuInCart.has">
            <view
              class="w-6 h-6 rounded-full bg-white border border-red-600 flex items-center justify-center"
            >
              <text class="i-ic-round-minus text-red-600 text-xl"></text>
            </view>
            <view>
              <text class="text-xl">{{ skuInCart.count }}</text>
            </view>
            <view
              class="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center"
              @click="handleAddCard"
            >
              <text class="i-ic-round-plus text-white text-xl"></text>
            </view>
          </view>
          <view
            class="px-2 py-1 bg-red-600 rounded-md text-white leading-normal"
            v-if="!skuInCart.has"
            @click="handleAddCard"
            >加入购物车</view
          >
        </view>
    </view>
  </view>
</template>
<style scoped lang="less"></style>
