/**
 * @Author:Training
 * @Desc:将需要使用的action在此处进行开放,便于管理
 * @Params:none
 */
import {onThemeChange} from "./theme/index";
import {
    onLoadPopularData,
    onLoadMorePopularData,
} from "./popular/index";
import {
    onLoadTrendingData,
    onLoadMoreTrendingData
} from "./trending/index";
import {
    addFavoriteData,
    getFavoriteData,
    removeFavoriteData,
    updateFavoriteItem,
    getAllFavoriteData
} from './favorite'
export default {
    onThemeChange: onThemeChange,
    onLoadPopularData,
    onLoadMorePopularData,
    addFavoriteData,
    removeFavoriteData,
    getFavoriteData,
    onLoadTrendingData,
    onLoadMoreTrendingData,
    getAllFavoriteData,
    updateFavoriteItem,
}