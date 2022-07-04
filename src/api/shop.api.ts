import http from "@/http";
function find(id:number){
    return http.get('/shop')
}
function findList(){
    return http.get('/shop/list')
}
export const shopApi = {
    find,
    findList
}