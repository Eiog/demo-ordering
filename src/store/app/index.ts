import { defineStore } from "pinia";
import { createPersistedState } from 'pinia-plugin-persistedstate'
type State = {
    userInfo?:App.User
    token:string
}
export const useAppStore = defineStore({
    id: 'appStore',
    persist: {
        key: 'token',
        paths: ['token']
      },
    state: ():State => ({
        userInfo:undefined,
        token:''
    }),
    actions: {

    },
    getters: {

    }
})