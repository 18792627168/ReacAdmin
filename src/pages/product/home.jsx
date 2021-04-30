import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Space,
    message,
    Modal
} from 'antd'
import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

// Product的默认子路由组件
export default class ProductHome extends Component {
    state = {
        products: [],
        total: 0, // 商品的总数量
        loading: false,
        searchName: '',  // 搜索的关键字
        searchType: productName,  // 根据哪个字段搜索s
    }
    initColumns = () => {

    }
    // 获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.setState({ loading: true })
        // 添加是否有查询条件
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = reqSearchProducts({ pageNum, pageSize, searchName, searchType })
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }

        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list
            })
        }
    }

    componentDidMount() {
        this.getProducts(1);
    }
    render() {
        const { product, total, loading, searchType, searchName } = this.state
        const title = (
            <span>
                <Select value={searchType} style={{ width: 150 }} onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} value={searchName} onChange={event => this.setState({ searchName: event.target.value })} />
                <Button type="primary" onClick={ }>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary">
                <Icon type="plus" /> 添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowkey="_id"
                    loading={loading}
                    dateSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}></Table>
            </Card>
        )
    }
}