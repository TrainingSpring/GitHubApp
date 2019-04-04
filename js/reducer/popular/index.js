/**
* @Author:Training
* @Desc:创建reducer动作功能函数
* @Params: state    之前的状态
* @Params: action   更改的action的值
*/
import types from '../../action/types'
const defaultState = {};
export default function onAction(state=defaultState,action) {

    switch(action.type){
        case types.POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    items:action.items,
                    isLoading:false
                }
            };
        case types.POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    error:true,
                    isLoading:false
                }
            };
        case types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:true
                }
            };
        default:
            return state;
    }
}