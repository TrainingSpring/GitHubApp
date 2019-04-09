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
const TypeStore = TYPESTORE.trending
 /**
  * @Author:Training
  * @Desc:加载popular中的数据
  * @params:
    * storeName : 数据源名  如java,Android等...
    * url : 借口地址(缓存的key值)
    * 是否为下拉刷新
    * 每一页的数据数量
  */
export function onLoadTrendingData(storeName,url,refresh,pageSize) {
    return dispatch=>{
        dispatch({
            type:types.TRENDING_REFRESH,
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
                handleData(types.TRENDING_SUCCESS,dispatch,storeName,data,pageSize);
            })
            .catch(error=>{
                console.log('Error:',error);
                dispatch({
                    type:types.TRENDING_FAIL,
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
export function onLoadMoreTrendingData(storeName,allData,items,pageSize,pageIndex){
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
                type:types.TRENDING_LOAD_MORE_FAIL,
                storeName,
                items:result,
                data:allData
            });
            ToastAndroid.show("没有更多了...",ToastAndroid.SHORT);
        }else {
            dispatch({
                type:types.TRENDING_LOAD_MORE_SUCCESS,
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
export function addFavoriteData(data,callBack = ()=>{}){
    return dispatch=>{
        let dataStore = new CacheFavorite('trending');
        dataStore.setData(data.id,data).then(status=>{
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
export function removeFavoriteData(key,callBack = ()=>{}){
    return dispatch=>{
        let dataStore = new CacheFavorite('trending');
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
        /*dataStore.getData().then(response=>{
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
        })*/
    }
}
  /**
   * @Author:Training
   * @Desc:查找指定收藏
   * @Params:data
   */
export function getFavoriteData(key,callBack=()=>{},isState){
    return dispatch=>{
        let dataStore = new CacheFavorite('trending');
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