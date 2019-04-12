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
        case types.FAVORITE_SUCCESS:
            return {
                ...state,
                items:action.items,
                status:action.status
            };
        case types.FAVORITE_FAIL:
            return {
                ...state,
                status:action.status
            };
        case types.FAVORITE_GET_SUCCESS:
            return{
                ...state,
                popularData:action.popularData?action.popularData:state.popularData,
                trendingData:action.trendingData?action.trendingData:state.trendingData,
                status:true,
                isLoading:false
            };
        case types.FAVORITE_GET_RELOAD:
            return{
                ...state,
                status:false,
                isLoading:true
            };
        case types.FAVORITE_GET_FAIL:
            return{
                ...state,
                popularData:action.popularData?action.popularData:null,
                trendingData:action.trendingData?action.trendingData:null,
                status:'fail',
                isLoading:false
            };
        default:
            return state;
    }
}