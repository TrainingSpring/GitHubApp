/**
* @Author:Training
* @Desc:创建action,此action用于保存状态和数据
* @Params:
 * storeName    数据名  如ios,Android,java等
 * url:         获取数据的地址
*/
import types from '../types'
import CachePopular from '../../cache/cachePopular'
import CacheFavorite from '../../cache/cacheFavorite'
import {ToastAndroid} from 'react-native'
 /**
  * @Author:Training
  * @Desc:加载popular中的数据
  * @params:
    * storeName : 数据源名  如java,Android等...
    * url : 借口地址(缓存的key值)
    * 是否为下拉刷新
    * 每一页的数据数量
  */
export function onLoadPopularData(storeName,url,refresh,pageSize) {
    return dispatch=>{
        dispatch({
            type:types.POPULAR_REFRESH,
            storeName:storeName
        });
        let dataStore = new CachePopular();
        let dataPromise ;
        if (refresh) {
            dataPromise = dataStore.updateData(url);
        }else{
            dataPromise = dataStore._initData(url);
        }

        dataPromise
            .then(res=>{
                const data = JSON.parse(res.data);
                handleData(dispatch,storeName,data,pageSize);
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
function handleData(dispatch,storeName,data,pageSize){
    const items = data && data.items;
    let viewData = items.length<pageSize?items:items.slice(0,pageSize) ;
    dispatch({
        type:types.POPULAR_SUCCESS,
        items:viewData,
        data:items,
        storeName
    })
}
 /**
  * @Author:Training
  * @Desc:加载更多数据
  * @Params:dispatch,storeName,data,pageSize,pageIndex
  */
export function onLoadMorePopularData(storeName,allData,items,pageSize,pageIndex){
    return dispatch=>{
        let result = items;
        let status = false;
        if(allData.length>(pageSize * pageIndex)){
            let centerData = allData.slice(items.length,(pageIndex * pageSize));
            result = result.concat(centerData);
            status = true;
        }else if((pageSize*pageIndex) - allData.length <pageSize){
            let centerData = allData.slice(items.length,allData.length);
            result = result.concat(centerData);
            status = true;
        }
        if(!status){
            dispatch({
                type:types.POPULAR_LOAD_MORE_FAIL,
                storeName,
                items:result,
                data:allData
            });
            ToastAndroid.show("没有更多了...",ToastAndroid.SHORT);
        }else {
            dispatch({
                type:types.POPULAR_LOAD_MORE_SUCCESS,
                storeName,
                items:result,
                data:allData
            })
        }
    }
 }
  /**
   * @Author:Training
   * @Desc:添加收藏
   * @Params:data
   */
export function addFavoriteData(data){
    return dispatch=>{
        let dataStore = new CacheFavorite();
        dataStore.addData(data.item).then(response=>{
            console.log(response,'item add favorite');
            dispatch({
                type:types.FAVORITE_SUCCESS,
                items:response.item
            })
        }).catch(error=>{
            console.log(error,"error add favorite")
            dispatch({
                type:types.FAVORITE_FAIL,
                status:true
            })
        })
    }
}
  /**
   * @Author:Training
   * @Desc:查找所有收藏
   * @Params:data
   */
export function getFavoriteData(){
    return dispatch=>{
        let dataStore = new CacheFavorite();
        dataStore.getData().then(response=>{
            console.log(response);
            dispatch({
                type:types.FAVORITE_SUCCESS,
                status:false,
                items:response
            })
        }).catch(error=>{
            console.log(error)
            dispatch({
                type:types.FAVORITE_SUCCESS,
                status:true
            })
        })
    }
}