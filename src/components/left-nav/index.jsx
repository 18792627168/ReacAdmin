import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
// import {
//   PieChartOutlined,
//   MailOutlined,
// } from '@ant-design/icons';

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

// 左侧导航的组件
class LeftNav extends Component{
  state = {
    collapsed: false,
  };
  /*
    根据menu的数据数组生成对应的标签数组
    使用map() + 递归调用
  */
  
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      }else{
        return(
          <SubMenu key={item.key} title={item.title}>
            {/* 这里是递归调用的一个操作*/}
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      }
      // return
    })
  }
  /*
    根据menu的数据数组生成对应的标签数组
    使用reduce() + 递归调用
  */
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      // 向pre添加<Menu.Item>
      if(!item.children){
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        ))
      }else{
        // 像pre添加<SubMenu>
        pre.push((
          <SubMenu key={item.key} title={item.title}>
            {/* 这里是递归调用的一个操作 */}
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    },[])
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
    // 得到当前请求的路径   this.props.location.pathname需要进入到浏览器内的react组件内进行查看   这个需要在路由组件内才可以使用
    // location，history, match是路由组件才可以得到的属性
    const path = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台管理</h1>
        </Link>
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button> */}
        <Menu
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
          defaultSelectedKeys={[path]}
        >
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </div>
    )
  }
}

/*
  withRouter高阶组件：
  包装非路由组件，返回一个新的组件
  新的组件向非路由组件传递三个属性：history/location/match
*/
export default withRouter(LeftNav)