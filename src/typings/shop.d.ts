declare namespace SHOP {
    type Sku = {
        id: number
        name: string
        items: {
            id: number
            name: string
            checked?: boolean
            disabled?: boolean
            selectCount?:number
            selected?:boolean
        }[]
    }
    type Goods = {
        id: number
        name: string
        subtitle: string
        cover: string
        price: number
        oldPrice: number
        tag: string[]
        sku: Sku[]
        selected?: boolean
        selectCount?: number
    }
    type GoodsClassify = {
        id: number
        name: string
        goods: Goods[]
        selected?: boolean
        selectCount?: number
    }
    type ShopInfo = {
        id: number
        name: string
        notice: string
        addr: string
        time: string
        status: number
        phone: number
        location: {
            longitude: number
            latitude: number
        },
    }
    type Shop = {
        info: ShopInfo
        goodsClassify: GoodsClassify[]
    }
    type ShopCart = {
        shop: ShopInfo
        goodsClassify: GoodsClassify
        goods: Goods
        sku: Sku['items']
        count: number
    }
    type SelectedSku = {
        
    }
}