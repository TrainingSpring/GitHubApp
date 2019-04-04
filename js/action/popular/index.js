/**
* @Author:Training
* @Desc:创建action,此action用于保存状态和数据
* @Params:
 * storeName    数据名  如ios,Android,java等
 * url:         获取数据的地址
*/
import types from '../types'
import Cache from '../../cache/cache'
export function onLoadPopularData(storeName,url) {
    return dispatch=>{
        dispatch({
            type:types.POPULAR_REFRESH,
            storeName:storeName
        });
        let dataStore = new Cache()
        dataStore._initData(url)
            .then(res=>{
                const data = JSON.parse(res.data);
                handleData(dispatch,storeName,data);
            })
            .catch(error=>{
                console.log('Error:',error);
                dispatch({
                    type:types.POPULAR_FAIL,
                    storeName,
                    error:error
                })
            })
    }
}
//操作数据
function handleData(dispatch,storeName,data){
    dispatch({
        type:types.POPULAR_SUCCESS,
        items:data && data.items,
        storeName
    })
}