import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';

import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;

// 左侧导航的组件
export default class LeftNav extends Component{
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
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
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="5">品类管理</Menu.Item>
            <Menu.Item key="6">商品管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}