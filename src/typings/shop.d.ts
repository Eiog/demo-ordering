declare namespace Shop {
    type Sku = {
        id:number
        name:string
        data:{
            id:number
            name:string
            checked?:boolean
            disabled?:boolean
        }[]
    }
    type GoodData = {
        id: number
        name: string
        subtitle: string
        cover: string
        price: number
        oldPrice: number
        tag: string[]
        sku:Sku[]
    }
    type Goods = {
        id: number
        classify: string
        data: GoodData[]
    }
    type ShopData = {
        id: number
        name: string
        location: {
            longitude: number
            latitude: number
        },
        notice: string
        goods: Goods[]
    }
}