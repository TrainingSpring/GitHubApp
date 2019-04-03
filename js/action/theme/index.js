/**
* @Author:Training
* @Desc:集中对于action的创建,每一个action只需一个action方法即可创建
* @Params:theme:需要写入该类型的参数
*/
import types from '../types'
export function onThemeChange(theme) {
    return{
        type:types.THEME_CHANGE,
        theme:theme
    }
}