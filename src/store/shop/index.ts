import { defineStore } from "pinia";
export const useShopStore = defineStore({
    id: 'shopStore',
    state: () => ({
        card:[]
    }),
    actions: {
        setCard(data:any){
            this.card.push(data)
        }
    },
    getters: {

    }
})