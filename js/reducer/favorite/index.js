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
                status:true
            };
        case types.FAVORITE_FAIL:
            return {
                ...state,
                status:false
            };
        default:
            return state;
    }
}