import {AsyncStorage} from 'react-native'
/**
* @Author:Training
* @desc
 * _initData入口进入
 * 由_initData调用getData获取本地数据,并且由timeCheck检测数据有效性,若数据为真,且数据有效,则返回本地缓存数据
 * 否则调用getNetData来获取网络数据,如若获取到网络数据,则调用saveData来储存数据,
 * 在saveData中,储存的数据由于需要时间来判定有效性,所以调用addTimeInfo在已有数据的基础上添加时间信息,
 * 在_initData入口文件中,在执行getNetData后,调用getData获取数据,获取成功则返回数据,获取失败返回error!
*
* @Warning:
 * 需要注意的是,在各种情况下的数据返回的类型是相同的,不要这里返回数据data,那里返回数据timeStamp,
 * 而另外的其他地方则返回完整数据,这会导致数据的不一致,从而在使用的时候导致解析失败而发生的错误
*/
export default class CacheFavorite {
    saveData(dataArray){
        let dataObj = {
            data:dataArray,
            dataStamp:new Date().getTime()
        }
        dataObj = JSON.stringify(dataObj)
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem("favorite",dataObj,error=>{
                if (!error){
                    resolve()
                }else{
                    reject(error);
                }
            });
        })
    }
    getData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('favorite',(error,string)=>{
                if (!error){
                    resolve(JSON.parse(string));
                } else{
                    reject(error);
                }
            })
        })
    }
    deleteData(index){
        return new Promise((resolve, reject) => {
            this.getData().then((response)=>{
                let res = JSON.parse(response);
                let result = res.data;
                if (result.length>1 && index >=0){
                    result.splice(index,1);
                }
                res.data = result;
                resolve(res);
            }).catch(error=>{
                reject(error);
            })
        })
    }
    addData(data){
        return new Promise((resolve, reject) => {
            this.getData().then((response)=>{
                let result = [];
                if (response){
                    response.data['favorite'] = true;
                    result =response.data;
                }
                result.push(data);
                this.saveData(result).then(err=>{

                    console.log(result);
                    resolve(result);
                });

            }).catch(error=>{
                reject(error);
            })
        })
    }
}