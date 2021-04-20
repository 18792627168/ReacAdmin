import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button'

import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import './index.less'

// 左侧导航的组件
class Header extends Component{
  state = {
    currentTime: formateDate(Date.now()),  // 当前时间
    dayPictureUrl: '',   // 天气图片
    weather: '',    // 天气文本
  }
  getTime =() => {
    // 每隔一秒更新当前时间，并更新状态currentTime
    this.intervalId = setInterval(() =>{  
      const currentTime = formateDate(Date.now());
      // 设置状态
      this.setState({currentTime})
    },1000)
  }
  getWeather = async () => {
    // 调用接口请求函数
    const {dayPictureUrl, weather} = await reqWeather('北京')
    // 更新状态
    this.setState({dayPictureUrl, weather})
  }
  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title 
    menuList.forEach(item => {
      if(item.key === path){ // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      }else if(item.children){
        const cItem = item.children.find(cItem => cItem.key===path)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }
  // 在第一次render()之后执行
  // 一般在此处执行的异步操作是：发ajax请求/启动定时器
  componentDidMount(){
    this.getTime()
    this.getWeather()
  }
  // 退出登录
  logout = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定退出吗？',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 删除保存的数据
        this.props.history.replace('/login')
      }
    })
  }
  // 当前组件卸载之前
  componentWillUnmount(){
    // 清除定时器
    clearInterval(this.intervalId)
  }


  render(){
    const {currentTime,dayPictureUrl,weather} = this.state;
    const username = memoryUtils.user.username;
    // 得到当前需要显示的title
    const title = this.getTitle()

    
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          {/* eslint-disable-next-line */}
          {/* <a href="javascript:void(0)" onClick={this.logout}>退出</a> */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {/* <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/> */}
            <img src={dayPictureUrl} alt="weather"/>
            <span>晴{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)