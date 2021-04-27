import React, {Component} from 'react'
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
import { reqCategorys } from '../../api'

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
            <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>
            {/* 向事件回调函数传递参数，先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
            {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(record)}>查看子分类</LinkButton> : null}
          </Space>
        ),
      },
    ];
  }
  // 发送请求 一/二级分类
  getCategorys = async (parentId) => {
    // 在发请求前显示loading
    this.setState({loading:true});
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId);
    this.setState({loading:false});
    if(result.status === 0){
      const categorys = result.data;
      if(parentId === '0'){
        this.setState({
          categorys
        })
      }else{
        this.setState({
          subCategorys: categorys
        })
      }
    }else{
      message.error("获取分类列表失败！")
    }
  }
  // 显示指定一级分类对象的二级分类列表
  showSubCategorys = (record) => {
    console.log("record",record)
    // this.setState 是异步操作
    this.setState({
      parentId: record._id,
      parentName: record.name
    }, () => {
      console.log("this.state.parentId",this.state.parentId)
      this.getCategorys();
    }) 
  }

  // 显示指定一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName:'',
      subCategorys: []
    })
  }
  // 响应点击取消:隐藏确定框
  handleCancel = () => {
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
  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }
  // 添加分类
  addCategory =() => {

  }
  // 更新分类
  updateCategory = () => {

  }
  // 执行异步任务：发送请求
  componentDidMount(){
    this.initColumns()
    this.getCategorys()
  }
  render(){
    // 读取状态数据
    const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state;
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

    
    return(
      <Card title={title} extra={extra}>
        <Table bordered 
          dataSource={parentId==='0' ? categorys: subCategorys} 
          columns={this.columns} 
          loading={loading}
          rowKey="_id"
          pagination={{defaultPageSize:5}}
        ></Table>


      <Modal 
        title="添加分类" 
        visible={showStatus === 1} 
        onOk={this.addCategory} 
        onCancel={this.handleCancel}>
        <p>添加界面</p>
      </Modal>

      <Modal 
      title="更新分类" 
      visible={showStatus === 2} 
      onOk={this.updateCategory} 
      onCancel={this.handleCancel}>
        <p>更新界面</p>
      </Modal>

      </Card>
    )
  }
}