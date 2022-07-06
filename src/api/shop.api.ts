import http from "@/http";
function find(id:number){
    return http.get('/shop') as Promise<SHOP.Shop>
}
function findList(){
    return http.get('/shop/list')
}
export const shopApi = {
    find,
    findList
}