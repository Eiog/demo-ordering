import { defineStore } from "pinia";

type State = {
    shopCart?: SHOP.ShopCart[]
    goodsClassify?: SHOP.GoodsClassify[]
    goods?: SHOP.Goods[]
    shopInfo?: SHOP.ShopInfo
}
export const useShopStore = defineStore({
    id: 'shopStore',
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
        }
    },
    getters: {
        count(state) {
            let count = 0
            for (const item of state.shopCart!) {
                count += item.count
            }
            return count
        },
        price(state) {
            let price = 0
            for (const item of state.shopCart!) {
                price += item.goods.price * item.count
            }
            return price
        }
    }
})