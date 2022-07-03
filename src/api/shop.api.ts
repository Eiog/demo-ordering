import http from "@/http";
function find(id:number){
    return http.get('/shop')
}
export const shopApi = {
    find
}