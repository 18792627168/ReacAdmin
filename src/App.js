import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'   // 没有#的路由

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

// BrowserRouter 为路由器  这里的组件名必须大写
// 应用的根组件

export default class App extends Component{

  render(){
    return (
      <BrowserRouter>
        <Switch>  {/* 只匹配其中一个 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
        
      </BrowserRouter>
    )
  }
}