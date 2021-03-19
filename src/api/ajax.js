/*
能发送异步ajax请求的函数模块
封装axios
函数的返回值是Promise对象
1.优化：统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时，不去reject(error)，而显示错误提示
2.优化：异步得到的不是res，而是res.data
    在请求成功resolve时，resolve(response.data)
*/

import axios from 'axios'
import { message } from 'antd'

// data指定默认值为{}
export default function ajax (url, data={}, type='GET'){
    return new Promise((resolve, reject) => {
        let promise
        // 1.执行异步ajax请求
        if(type === 'GET'){
            promise = axios.get(url, {params: data})
        }else{
            promise = axios.post(url, data)
        }
        // 2.如果成功了，调用resolve(value)
        promise.then(res => {
            resolve(res.data)
        // 3.如果失败了，不调用reject(reason)，提示异常信息  
        }).catch(error => {
            // reject(error)
            message.error('请求出错了：'+error.message);
        })
        

        
    })
}

// 请求登录接口
// ajax('/login', {username})