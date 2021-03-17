// 能发送异步ajax请求的函数模块
// 封装axios
// 函数的返回值是Promise对象

import axios from 'axios'

// data指定默认值为{}
export default function ajax (url, data={}, type='GET'){
    url = 'http://127.0.0.1:5000'+url;
    if(type === 'GET'){
        return axios.get(url, {params: data})
    }else{
        return axios.post(url, data)
    }
}

// 请求登录接口
// ajax('/login', {username})