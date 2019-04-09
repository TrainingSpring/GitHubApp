
//操作数据
import types from "./types";

export function handleData(dataAction,dispatch, storeName, data, pageSize){
    let items ;
    let viewData =[];
    if (data) {
        if (Array.isArray(data)) {
            viewData = data.length<pageSize?data:data.slice(0,pageSize) ;
            items = data;
        }else if(Array.isArray(data.items)){
            viewData = data.items.length<pageSize?data.items:data.items.slice(0,pageSize) ;
            items = data.items;
        }
    }
    dispatch({
        type:dataAction,
        items:viewData,
        data:items,
        storeName
    })
}