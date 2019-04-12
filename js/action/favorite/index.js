
import CacheFavorite from '../../cache/cacheFavorite'
import types from "../types"
import {TYPESTORE} from "../../cache/dataStore";

/**
 * @Author:Training
 * @Desc:添加收藏
 * @Params:data
 */
export function addFavoriteData(key, data, callBack = () => {}, flag) {
    return dispatch => {
        let dataStore = new CacheFavorite(flag);
        dataStore.setData(key, data).then(status => {
            callBack(true);
            dispatch({
                type: types.FAVORITE_SUCCESS,
                status: true,
            });
        }).catch((error) => {
            callBack(false);
            dispatch({
                type: types.FAVORITE_FAIL,
                status: false,
            })

        })
    }
}

/**
 * @Author:Training
 * @Desc:取消收藏
 * @Params:data
 */
export function removeFavoriteData(key, callBack = () => {}, flag) {
    return dispatch => {
        let dataStore = new CacheFavorite(flag);
        dataStore.removeData(key).then(res => {
            callBack(true);
            dispatch({
                type: types.FAVORITE_SUCCESS,
                status: false
            });
        }).catch(err => {
            callBack(false);
            dispatch({
                type: types.FAVORITE_FAIL
            })
        })
    }
}

/**
 * @Author:Training
 * @Desc:查找指定收藏
 * @Params: key,callBack=()=>{},isState,flag
 */
export function getFavoriteData(key, callBack = () => {}, isState, flag) {
    return dispatch => {
        let dataStore = new CacheFavorite(flag);
        if (!key) {
            dispatch({
                type: types.FAVORITE_FAIL,
                error: "this key is undefined!"
            });
            callBack(0);
            return;
        }
        dataStore.getFavoriteData(key, isState).then(res => {
            if (isState) {
                dispatch({
                    type: types.FAVORITE_SUCCESS
                });
                callBack(res);
            } else {
                dispatch({
                    type: types.FAVORITE_SUCCESS,
                    item: res
                });
                callBack(1);
            }
        });
    }
}

/**
 * @Author:Training
 * @Desc:获取全部收藏
 * @Params:
 */
export function getAllFavoriteData(flag, callBack = () => {}) {
    return dispatch => {
        dispatch({
            type: types.FAVORITE_GET_RELOAD,
        });
        let dataStore = new CacheFavorite(flag);
        dataStore.getAllData().then(res => {
            let result = [];
            if (Array.isArray(res)) {
                for (let i in res) {
                    let jsonData = typeof res[i][1] === 'string' ? JSON.parse(res[i][1]) : res[i][1];
                    result.push(formatData(jsonData,true));
                }
            }
            callBack('success');
            if (flag === TYPESTORE.popular) {
                dispatch({
                    type: types.FAVORITE_GET_SUCCESS,
                    popularData: result
                })
            } else if (flag === TYPESTORE.trending) {
                dispatch({
                    type: types.FAVORITE_GET_SUCCESS,
                    trendingData: result
                })
            }

        }).catch(error => {
            console.log("获取所有收藏数据失败: " + error);
            dispatch({
                type: types.FAVORITE_GET_FAIL,
                data: []
            })
            callBack('fail');
        })
    }
}

/**
 * @Author:Training
 * @Desc:刷新收藏信息
 * @Params:   data  数据源
 *            callBack(error) 回调函数
 *            error: 处理错误信息
 */
export function onFreshFavoriteData(flag, data = [], callBack = (error) => {}) {
    return new Promise((resolve, reject) => {
        if (!data) {
            callBack('更新收藏数据失败,data数据不能为空');
            reject();
        } else if (!Array.isArray(data)) {
            callBack('更新收藏数据失败,data数据格式错误,数据类型不是一个数组');
            reject();
        }
        let projectData = new Array();
        for (let i in data) {
            let key = flag === TYPESTORE.popular?data[i].id:data[i].url;

            checkFavorite(key, flag)
                .then(response=>{
                    projectData.push(formatData(data[i], response));
                    if (i == data.length-1){
                        resolve(projectData);
                    }
                }).catch(error=>{
                reject('检测Favorite错误: ',error);
            });
        }
    })
}

/**
 * @Author:Training
 * @Desc:通过key检查数据是否被收藏
 * @Params: key , flag
 */
function checkFavorite(key, flag) {
    return new Promise((resolve, reject) => {
        if (!key) {
            resolve(false)
        }
        let dataStore = new CacheFavorite(flag);
        dataStore.getFavoriteKeys()
            .then(res => {
                key  = typeof key != 'string'?key+"":key;
                let state;
                if (!res){
                    state = false;
                } else{
                    let index = res.indexOf(key);
                    state = index <= -1 ? false : true;
                }

                resolve(state);
            }) .catch(error=>{
            reject(error)
        })
    })
}

/**
 * @Author:Training
 * @Desc: 格式化数据
 *        格式化后的数据是为了方便收藏的渲染操作
 * @Params: data   isFavorite
 */
function formatData(data, isFavorite) {
    return ({
        data: data,
        isFavorite: isFavorite
    })
}
/**
 * @Author:Training
 * @Desc:更新当前item的状态
 * @Params: data,index
 */
export function updateFavoriteItem(data,index,status,flag){
    return dispatch=>{
        if (!data|| typeof index !='number' || index<0){
            console.log("请正确输入data或者index");
            return false
        }
        data[index].isFavorite = status;
        if (flag === TYPESTORE.popular) {
            dispatch({
                type:types.POPULAR_SUCCESS,
                items:data
            })
        }else{
            dispatch({
                type:types.TRENDING_SUCCESS,
                items:data
            })
        }
    }




}
