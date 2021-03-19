import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

// 后台管理的路由组件
export default class Admin extends Component{
  render(){
    const user = memoryUtils.user;
    // 如果内存中没有存储user ==>当前没有登录
    if(!user || !user._id){
      // 如果没有数据，自动跳转到登录页面(在render()内跳转应使用Redirect标签)
      return <Redirect to='/login'/>
    }
    return (
      <div>
        hello, {user.username}
      </div>
    )
  }
}