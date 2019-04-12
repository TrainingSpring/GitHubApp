/**
* @Author:Training
* @Desc:创建action,此action用于保存状态和数据
* @Params:
 * storeName    数据名  如ios,Android,java等
 * url:         获取数据的地址
*/
import types from '../types'
import DataStore,{TYPESTORE} from '../../cache/dataStore'
import {ToastAndroid} from 'react-native'
import {handleData} from "../actionDataUtil";
import {onFreshFavoriteData} from "../favorite";
const TypeStore = TYPESTORE.trending;
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
                handleData(types.TRENDING_SUCCESS,dispatch,storeName,data,pageSize,TypeStore);
            })
            .catch(error=>{
                console.log('Error: 操作数据失败:',error);
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
        let centerData = [];
        if(allData.length>(pageSize * pageIndex)){
            centerData = allData.slice(items.length,(pageIndex * pageSize));
            status = true;
        }else if((pageSize*pageIndex) - allData.length <pageSize){
            centerData = allData.slice(items.length,allData.length);
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
            onFreshFavoriteData(TypeStore,centerData,(error)=>{
                if (error) {
                    console.log(error);
                }
            }).then(res=>{
                result = result.concat(res);
                dispatch({
                    type:types.TRENDING_LOAD_MORE_SUCCESS,
                    items:result,
                    data:allData,
                    storeName
                });
            }).catch(error=>{
                console.log('刷新收藏数据失败');
            })
        }
    }
 }