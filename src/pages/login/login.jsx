import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.less'
import logo from './images/logo.png'
import {regLogin} from '../../api'

// 登录的路由组件
export default class Login extends Component{
  onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const {username, password} = values
    try{
      const res = await regLogin(username, password);
      console.log("res",res);
    }catch(err){
      console.log("err",err);
    }
  };
  validatePwd = (rule, value, callback) => {
    // 自定义验证 可拓展
    // callback() 验证通过   callback('xxxx') 验证失败，并指定提示文本
    if(!value){
      callback('密码必须输入')
    }else if(value.length>12){
      callback('密码不能大于12位')
    }else if(value.length<4){
      callback('密码不能小于4位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须是英文数组下划线')
    }else{
      callback()
    }
  }
  render(){
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                // 声明式验证：直接使用别人定义好的验证规则进行验证
                { required: true, message: '请输入用户名！' },
                { min: 4, message: '用户名最少4位' },
                { max: 12, message: '用户名最大12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数组下划线' },
                // 正则内的  +  表示最少匹配一位
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" style={{opacity:'0.5'}}/>} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { validator: this.validatePwd }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" style={{opacity:'0.5'}}/>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}