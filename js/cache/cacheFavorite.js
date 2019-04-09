import {AsyncStorage} from 'react-native'

/**
* @Author:Training
* @desc
*
* @Warning:
 * 需要注意的是,在各种情况下的数据返回的类型是相同的,不要这里返回数据data,那里返回数据timeStamp,
 * 而另外的其他地方则返回完整数据,这会导致数据的不一致,从而在使用的时候导致解析失败而发生的错误
*/
export default class CacheFavorite {
    constructor(flag){
        this.favoriteKey = flag;
    }
     /**
      * @Author:Training
      * @Desc:添加一条收藏数据
      * @Params: key: 数据的id    value:整个数据
      */
    setData(key,value){
        return new Promise((resolve, reject) => {
            if (!key || !value){
                return false;
            }
            key = typeof key !='string'?key.toString():key;
            value = typeof value == 'string'?value:JSON.stringify(value);
            AsyncStorage.setItem(key,value,error => {
                if (!error) {
                    this.updateData(key,false);
                    resolve(true);
                }else{
                    reject("收藏失败: "+error);
                }

            })
        });

    }
     /**
      * @Author:Training
      * @Desc:更细数据
      * @Params: commandKey  公用的key值,保存所有数据的id值
      *          isDelete    是否删除某个数据
      */
     updateData(key,isDelete = false){
         return new Promise((resolve, reject) => {
             if (!key) reject("错误: key is undefined!");
             // key  = typeof key == "string"?key:key.toString();
             let result = [];
             if (!key) reject("对不起,更新数据失败,key为"+key);

             AsyncStorage.getItem(this.favoriteKey,((error, response) => {
                 if (!error){
                     if (response) {
                         result = JSON.parse(response);
                     }
                     let index = result.indexOf(key);
                     if (!isDelete) {
                         if (index === -1) result.push(key);
                     }else{
                         if (index !== -1) result.splice(index,1);
                     }
                 } else{
                     reject("更新数据错误: "+error);
                 }
             }))
                 .then(()=>{
                     AsyncStorage.setItem(this.favoriteKey,JSON.stringify(result),error => {
                         if (!error) resolve(true);
                     })
             });


         })
     }
      /**
       * @Author:Training
       * @Desc:删除指定key数据
       * @Params:key
       */
     removeData(key){

         return new Promise((resolve, reject) => {
             if (!key) reject("错误: key is undefined!");
             key = typeof key != 'string'?key.toString():key;
             AsyncStorage.removeItem(key,error => {
                 if (error) {
                     reject("删除数据失败: "+error);
                 }
                 this.updateData(key,true);
                 resolve(true);
             })
         })
      }
       /**
        * @Author:Training
        * @Desc:获取指定数据
        * @Params:key
        */
       getFavoriteData(key,isState = false){
           return new Promise((resolve, reject) => {
               if (!key)reject("this key is undefined");
               if (isState) {
                   AsyncStorage.getItem(this.favoriteKey,(error,response)=>{
                       if (error) {
                           reject('在 favoriteKey中未查找到内容:'+error);
                       }else if(!response){
                           resolve(false);
                       }else{
                           response = JSON.parse(response);
                           key = key.toString();
                           let state = response.indexOf(key);
                           state = state == -1 ? false : true;
                           resolve(state);
                       }
                   })
               }else{
                   key = typeof key == 'string'?key:key.toString();
                   AsyncStorage.getItem(key,(error,result)=> {
                       if (error) {
                           reject("查询数据失败:"+error);
                       }else if(!result){
                           reject("查询数据失败: this result is "+result);
                       }else{
                           resolve(JSON.parse(result));
                       }

                   })
               }

           })
       }
        /**
         * @Author:Training
         * @Desc:获取所有的favorite数据
         * @Params:
         */
        getAllData(){
            return new Promise((resolve, reject) => {
                this.getFavoriteData(this.favoriteKey).then(result =>{
                    if (result) {
                        AsyncStorage.multiGet(result,((error, response) =>{
                            if  (error)reject("查找所有数据错误: "+error);
                            resolve(JSON.parse(response))
                        } ))
                    }
                })
            })
        }
}