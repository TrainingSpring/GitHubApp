
//操作数据
import {onFreshFavoriteData} from "./favorite";

export function handleData(dataAction,dispatch, storeName, data, pageSize,flag){
    let items ;
    let viewData =[];
    if (data) {
        if (Array.isArray(data)) {
            items = data;
        }else if(Array.isArray(data.items)){
            items = data.items;
        }
        viewData = items.length<pageSize?items:items.slice(0,pageSize) ;

        onFreshFavoriteData(flag,viewData,(error)=>{
            if (error) {
                console.log(error);
            }
        }).then(res=>{
            viewData = res;
            dispatch({
                type:dataAction,
                items:viewData,
                data:items,
                storeName
            });
        }).catch(error=>{
            console.log('刷新收藏数据失败');
        })
    }

}