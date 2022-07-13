import { defineStore,createPinia  } from "pinia";
import { createPersistedState } from 'pinia-plugin-persistedstate'
type State = {
    shopCart?: SHOP.ShopCart[]
    goodsClassify?: SHOP.GoodsClassify[]
    goods?: SHOP.Goods[]
    shopInfo?: SHOP.ShopInfo
}
export const useShopStore = defineStore({
    id: 'shopStore',
    persist: {
        key: 'shopCart',
        paths: ['shopCart']
      },
    state: (): State => ({
        shopCart: [],
        shopInfo: undefined,
        goodsClassify: []
    }),
    actions: {
        setCart(data: SHOP.ShopCart) {
            if (this.shopCart?.length === 0) return this.shopCart?.push(data)
            let isAdd = false
            for (let i = 0; i < this.shopCart!.length; i++) {
                let item = this.shopCart![i]
                let isSome = item.sku.every((item, index) => {
                    return item.id === data.sku[index].id
                })
                if (item.shop.id === data.shop.id && isSome) {
                    this.shopCart![i!].count++
                    isAdd = true
                    break
                }
            }
            if (!isAdd) {
                this.shopCart?.push(data)
            }
        },
        removeCart(item:SHOP.ShopCart){
            const index = this.shopCart?.findIndex(val=>val===item)
            if(this.shopCart![index!].count>1){
                this.shopCart![index!].count--
                return
            }
            this.shopCart?.splice(index!,1)
        },
        clearCart(){
            this.shopCart = []
        }
    },
    getters: {
        _goodsClassify(state){
            return state.goodsClassify?.map(item=>{
                let count = 0
                let isSelected = false
                state.shopCart?.forEach((_item,_index)=>{
                    if(_item.goodsClassify.id===item.id) {
                        count +=_item.count
                        isSelected = true
                    }
                })
                item.selectCount = count
                item.selected = isSelected
                item.goods.map(_item=>{
                    let count = 0
                    let isSelected = false
                    state.shopCart?.forEach((__item,index)=>{
                        if(_item.id===__item.goods.id){
                            count +=state.shopCart![index].count
                            isSelected = true
                        }
                    })
                    _item.selectCount = count
                    _item.selected = isSelected
                    return _item
                })
                return item
            })
        },
        count(state) {
            let count = 0
            for (const item of state.shopCart!.filter(item=>item.checked)) {
                count += item.count
            }
            return count
        },
        price(state) {
            let price = 0
            for (const item of state.shopCart!.filter(item=>item.checked)) {
                price += item.goods.price * item.count
            }
            return price
        },
        checkedCart(state){
            return state.shopCart?.filter(item=>item.checked)
        }
    }
})