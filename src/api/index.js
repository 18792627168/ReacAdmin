/*
    要求：能根据接口文档定义接口请求
    包含应用中所有接口请求函数的模块
    每个函数的返回值都是Promise
*/

import ajax from './ajax'
import jsonp from 'jsonp'
// import { message } from 'antd';

// const BASE = 'http://localhost:5000'
// const BASE = ''
const BASE = 'http://120.55.193.14:5000';

export const regLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST');

// 添加用户
export const regUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');

// 获取一级/二级分类
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })  //第三个参数有默认值
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')
// 更新分类   两种参数接收方式均可
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryName, categoryId }, 'PUT')

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })


// 搜索商品分页列表(根据商品名称)
// searchType:搜索的类型，productName/productDesc
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
})
export const reqSearchProducts2 = ({ pageNum, pageSize, searchName }) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    productDesc: searchName
})



// 请求天气的接口目前有问题
// jsonp请求的接口请求函数
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (err, data) => {
            console.log("eee", err, data);
            // 成功
            if (!err && data.status === 'success') {
                const { dayPictureUrl, weather } = data.result[0].weathe_data[0];
                resolve({ dayPictureUrl, weather });
            } else {
                // 失败
                // message.error('获取天气信息失败！')

            }
        })
    })
}

// reqWeather('北京')






