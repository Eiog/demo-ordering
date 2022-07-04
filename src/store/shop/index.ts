import { defineStore } from "pinia";

type State = {
    card?: Shop.ShopCard[]
}
export const useShopStore = defineStore({
    id: 'shopStore',
    state: (): State => ({
        card: []
    }),
    actions: {
        setCard(data: Shop.ShopCard) {
            if (this.card?.length === 0) return this.card?.push(data)
            let isAdd = false
            for (let i = 0; i < this.card!.length; i++) {
                let item = this.card![i]
                let isSome = item.sku.every((item, index) => {
                    return item.id === data.sku[index].id
                })
                if (item.shop.id === data.shop.id && isSome) {
                    this.card![i!].count++
                    isAdd = true
                    break
                }
            }
            if (!isAdd) {
                this.card?.push(data)
            }
        }
    },
    getters: {
        count(state){
            let count = 0
            for (const item of state.card!) {
                count += item.count
            }
            return count
        },
        price(state){
            let price = 0
            for (const item of state.card!) {
                price += item.shop.price*item.count
            }
            return price
        }
    }
})