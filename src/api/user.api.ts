import http from "@/http";
const login = (openid:string,session_key:string):Promise<{userInfo:App.User,token:string}>=>{
    return http.get('/user/login',{openid,session_key}) as any
}
export const userApi = {
    login
}