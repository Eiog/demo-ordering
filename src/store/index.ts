import {createPinia} from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia().use(
    createPersistedState({
        storage:{
            getItem(key:string):string|null{
                return uni.getStorageSync(key)
            },
            setItem(key:string,value:string){
                uni.setStorage({key:key,data:value})
            }
        }
    })
)
export default store
export * from './app'
export * from './shop'