import Uni from '@dcloudio/uni-app'
declare module '@dcloudio/uni-app'{
    export interface UniApp{
        MapContext:{
            addMarkers(options:any):void
        }
    }
}