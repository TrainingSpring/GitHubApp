/**
* @Author:Training
* @Desc:创建reducer动作功能函数
* @Params: state    之前的状态
* @Params: action   更改的action的值
*/
import types from '../../action/types'
const defaultState = {
    theme:"blue"
}
export default function onAction(state=defaultState,action) {

    console.log(action.type,state,defaultState,"reducer1")
    switch(action.type){
        case types.THEME_CHANGE:
            console.log(action,state,defaultState,"reducer2")
            return {
                ...state,
                theme:action.theme
            };
        default:
            return state;
    }
}