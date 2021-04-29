import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  message,
  Modal
} from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

// 商品分类路由
export default class Category extends Component {
  state = {
    loading: false,
    categorys: [],  // 一级分类
    subCategorys: [],  // 二级分类
    parentId: '0',  // 当前需要显示的分类列表的parentId
    parentName: '',  // 需要显示的父类名称
    showStatus: 0,   // 标识添加/更新的确认框 0 都不显示 1：添加 2：更新
  }
  // 初始化数组列名
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (text, record) => (
          <Space size="middle">
            <LinkButton onClick={() => this.showUpdate(record)}>修改分类</LinkButton>
            {/* 向事件回调函数传递参数，先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(record)}>查看子分类</LinkButton> : null}
          </Space>
        ),
      },
    ];
  }
  // 发送请求 一/二级分类
  // parentId:如果没有指定根据状态中的parentId请求，如果指定了就根据指定的请求
  getCategorys = async (parentId) => {
    // 在发请求前显示loading
    this.setState({ loading: true });
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error("获取分类列表失败！")
    }
  }
  // 显示指定一级分类对象的二级分类列表
  showSubCategorys = (record) => {
    console.log("record", record)
    // this.setState 是异步操作
    this.setState({
      parentId: record._id,
      parentName: record.name
    }, () => {
      console.log("this.state.parentId", this.state.parentId)
      this.getCategorys();
    })
  }

  // 显示指定一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }
  // 响应模态框点击取消：隐藏模态框
  handleCancel = () => {
    this.setState({
      showState: 0
    })
    // 响应点击取消:隐藏确定框
    handleCancel = () => {
      // 清除输入数据
      this.form.resetFields()
      // 隐藏确认框
      this.setState({
        showStatus: 0
      })
    }
    // 显示添加
    showAdd = () => {
      this.setState({
        showStatus: 1
      })
    }
    // 显示修改确认框
    showUpdate = (category) => {
      this.category = category
      this.setState({
        showStatus: 2
      })
    }
    // 添加分类
    addCategory = async () => {
      this.setState({
        showStatus: 0
      })
      // 收集数据并提交添加分类请求（这个是教程内的东西）
      const { parentId, categoryName } = this.form.getFieldsValue()
      // 清除输入数据
      this.form.resetFields()

      const result = await reqAddCategory({ categoryName, parentId })
      if (result.status === 0) {
        // 重新获取分类列表显示
        if (parentId === this.state.parentId) {  // 在添加就是当前分类的情况下再查询列表
          this.getCategorys()
        } else if (parentId === '0') { //在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示
          this.getCategorys('0')
          // ths.setState({ parentId: '0' }, () => { this.getCategorys() })
        }
      }
    }
    // 更新分类
    updateCategory = async () => {
      // 表单验证通过才处理
      this.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            showStatus: 0
          })
          // 准备数据
          const categoryId = this.category._id
          const { categoryName } = values

          // 清除输入数据
          this.form.resetFields()

          const result = await reqUpdateCategory({ categoryId, categoryName })
          if (result.statue === 0) {
            this.getCategorys()
          }
        }
      })

    }
    // 执行异步任务发送请求
    componentDidMount() {
      this.initColumns()
      this.getCategorys()
    }
    render() {
      // 读取状态数据
      const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state;
      // 读取指定的分类
      const category = this.category || {}

      // card的标题及展示
      const title = parentId === '0' ? '一级分类列表' : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined />
          <span>{parentName}</span>
        </span>
      )
      const extra = (
        <Button type="primary" onClick={this.showAdd}>
          <PlusOutlined />
        添加
        </Button>
      );


      return (
        <Card title={title} extra={extra}>
          <Table bordered
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            loading={loading}
            rowKey="_id"
            pagination={{ defaultPageSize: 5 }}
          ></Table>

          {/* 这边用于添加分类 */}
          <Modal
            title="添加分类"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}>
            <AddForm
              categorys={categorys}
              parentId={parentId}
              setForm={(form) => { this.form = form }} />
          </Modal>

          <Modal
            title="更新分类"
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}>
            <UpdateForm
              categoryName={category.name}
              setForm={(form) => { this.form = form }} />
          </Modal>
        </Card>
      )
    }
  }
}