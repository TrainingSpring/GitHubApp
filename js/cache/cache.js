import {AsyncStorage} from 'react-native'


export default class Cache {
    /**
     * @Author: Training
     * @Desc: saveData
     * @Params: data 数据
     */
    saveData(url, data, callback) {
        if (!url || !data) return;
        AsyncStorage.setItem(url, JSON.stringify(this.addTimeInfo(data)), callback);
    }

    /**
     * @Author Training
     * @desc 添加时间参数
     * @param data
     * @returns {{data: *, timestamp: number}}
     */
    addTimeInfo(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }

    getData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, response) => {
                if (!error) {
                    resolve(response);
                } else {
                    resolve(this.getNetData(url))
                }
            })
        })
    }

    getNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error("the network request throw is error , check it please");
                    }
                })
                .then(responseData => {
                    this.saveData(url,responseData);
                    resolve();
                })
                .catch(error => {
                    console.error("从网络获取数据失败:",error);
                })
        })

    }
    /**
    * @Author:Training
    * @Desc:检测数据有效性
    * @Params: url
    */
    _initData(url) {
        return new Promise((resolve, reject) => {
            this.getData(url)
                .then((response) => {
                    let data = JSON.parse(response);
                    if ( data && this.timeCheck(data.timeStamp)) {
                        resolve(data.data);
                    } else {
                        this.getNetData(url)
                            .then(res=>{
                                this.getData(url)
                                    .then(response=>{
                                        resolve(response);
                                    })
                            })

                    }
                }).catch(error => {
                        reject(error)
            })
        })
    }

    timeCheck(timeStamp) {
        console.log(timeStamp,"timeCheck");
        let thisTime = new Date().getTime();
        if ((thisTime - timeStamp) > 14400000) return true;

        return false
    }
}