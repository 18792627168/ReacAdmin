/*
    要求：能根据接口文档定义接口请求
    包含应用中所有接口请求函数的模块
    每个函数的返回值都是Promise
*/

import ajax from './ajax'
// const BASE = 'http://localhost:5000'
// const BASE = ''
const BASE = 'http://120.55.193.14:5000';

export const regLogin = (username, password) => ajax(BASE+'/login',{username,password}, 'POST');

// 添加用户
export const regUser = (user) => ajax(BASE+'/manage/user/add',user, 'POST');







