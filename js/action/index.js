/**
* @Author:Training
* @Desc:将需要使用的action在此处进行开放,便于管理
* @Params:none
*/
import {onThemeChange} from "./theme/index";
import {onLoadPopularData,onLoadMorePopularData} from "./popular/index";
export default {
    onThemeChange:onThemeChange,
    onLoadPopularData,
    onLoadMorePopularData
}