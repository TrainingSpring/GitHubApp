/**
* @Author:Training
* @Desc:创建action,此action用于保存状态和数据
* @Params:
 * storeName    数据名  如ios,Android,java等
 * url:         获取数据的地址
*/
import types from '../types'
import DataStore,{TYPESTORE} from '../../cache/dataStore'
import CacheFavorite from '../../cache/cacheFavorite'
import {ToastAndroid} from 'react-native'
import {handleData} from "../actionDataUtil";

const TypeStore = TYPESTORE.popular;
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
        let dataStore = new DataStore();
        let dataPromise ;
        if (refresh) {
            dataPromise = dataStore.updateData(url,TypeStore);
        }else{
            dataPromise = dataStore._initData(url,TypeStore);
        }

        dataPromise
            .then(res=>{
                const data = typeof res.data === 'object'?res.data:JSON.parse(res.data);
                handleData(types.POPULAR_SUCCESS,dispatch,storeName,data,pageSize);
            })
            .catch(error=>{
                console.log('Error: 操作数据失败: ',error);
                dispatch({
                    type:types.POPULAR_FAIL,
                    storeName,
                    error:error
                })
            })
    }
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
export function addFavoriteData(key,data,callBack = ()=>{},flag){
    return dispatch=>{
        let dataStore = new CacheFavorite(flag);
        dataStore.setData(key,data).then(status=>{
            callBack(true);
            dispatch({
                type:types.FAVORITE_SUCCESS,
                status:true,
            })
        }).catch((error)=>{
            callBack(false);
            dispatch({
                type:types.FAVORITE_FAIL,
                status:false,
            })

        })
    }
}
  /**
   * @Author:Training
   * @Desc:取消收藏
   * @Params:data
   */
export function removeFavoriteData(key,callBack = ()=>{},flag){
    return dispatch=>{
        let dataStore = new CacheFavorite(flag);
        dataStore.removeData(key).then(res=>{
            callBack(true);
            dispatch({
                type:types.FAVORITE_SUCCESS,
                status:false
            })
        }).catch(err=>{
            callBack(false);
            dispatch({
                type:types.FAVORITE_FAIL
            })
        })
    }
}
  /**
   * @Author:Training
   * @Desc:查找指定收藏
   * @Params:data
   */
export function getFavoriteData(key,callBack=()=>{},isState,flag){
    return dispatch=>{
        let dataStore = new CacheFavorite(flag);
        if (!key) {
            dispatch({
                type:types.FAVORITE_FAIL,
                error:"this key is undefined!"
            });
            callBack(0);
            return;
        }
        dataStore.getFavoriteData(key,isState).then(res=>{
           if (isState) {
               dispatch({
                   type:types.FAVORITE_SUCCESS
               });
               callBack(res);
           }else{
               dispatch({
                   type:types.FAVORITE_SUCCESS,
                   item:res
               });
               callBack(1);
           }
        });
    }
}