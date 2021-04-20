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
    const path = this.props.location.pathname;
    console.log("path",path);
    return menuList.reduce((pre, item) => {
      // 向pre添加<Menu.Item>
      if(!item.children){
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        ))
      }else{
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        // 如果存在，说明当前item的子列表需要打开
        if(cItem){
          this.openKey = item.key;
        }

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
    const menuNodes = this.getMenuNodes(menuList);
    // 得到当前请求的路径   this.props.location.pathname需要进入到浏览器内的react组件内进行查看   这个需要在路由组件内才可以使用
    // location，history, match是路由组件才可以得到的属性
    const path = this.props.location.pathname;
    console.log("path",path);
    // 得到需要打开菜单
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {
            menuNodes
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