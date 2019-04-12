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
        case types.TRENDING_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items?action.items:state.items,
                    data:action.data?action.data:state.data,
                    isLoading:false,
                    finish:false
                }
            };
        case types.TRENDING_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    error:true,
                    isLoading:false
                }
            };
        case types.TRENDING_REFRESH:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:true
                }
            };
        case types.TRENDING_LOAD_MORE_SUCCESS:
            console.log(action,'reducer');
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items,
                    data:action.data,
                    isLoading:false,
                    finish:false
                }
            };
        case types.TRENDING_LOAD_MORE_FAIL:
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items,
                    data:action.data,
                    isLoading:false,
                    finish:true
                }
            };
        default:
            return state;
    }
}