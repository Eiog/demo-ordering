import http from "@/http";
const login = (openid:string,session_key:string):Promise<{userInfo:App.User,token:string}>=>{
    return http.get('/user/login',{openid,session_key}) as any
}
const status = (token:string):Promise<{userInfo:App.User,token:string}>=>{
    return http.get('/user/status',{token:token}) as any
}
export const userApi = {
    login,
    status
}