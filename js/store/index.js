import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/index'

/**
 * @Author:Training
 * @param store
 * @returns {function(*): Function}
 * @desc:编写redux中间件
 */
const logger = store=>next=>action=>{
    if (typeof action ==='function'){           //判断  action是否是一个function
        console.log('action is a function !')
    }else{
        console.log('dispatching:' ,action )    //打印redux状态改变前的action
    }
    const result = next(action);                //继续执行action
    console.log('nextState',store.getState());  //打印状态改变后的值
};
const favorite = store=>next=>action=>{
    console.log(store.getState(),"中间件编写测试---改写前");
    next(action)
    console.log(store.getState(),"中间件编写测试---改写后");
}

const middlewares = [
    middleware,
    thunk,
    favorite
];
/** * 创建store */
export default createStore(reducers, applyMiddleware(...middlewares));