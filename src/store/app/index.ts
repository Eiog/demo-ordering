import { defineStore } from "pinia";
type State = {
    userInfo?:App.User
    token:string
}
export const useAppStore = defineStore({
    id: 'appStore',
    state: ():State => ({
        userInfo:undefined,
        token:''
    }),
    actions: {

    },
    getters: {

    }
})