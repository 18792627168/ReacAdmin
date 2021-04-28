import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Opriot = Select.Option


// 添加分类的form组件
class AddForm extends Component {

    static propTypes = {
        categorys: PropTypes.array.isRequired,  // 一级分类的数组
        parentId: PropTypes.array.isRequired,   // 父id
    }

    render() {
        const
        return (
            <Form>
                <Item>
                    <Select
                        label="parentId"
                        name="username"
                        rules={[{ required: true, message: '请选择分类' }]}
                        defaultValue={{ value: '0' }}>
                        <Option value='0'>一级</Option>
                        <Option value='1'>电脑</Option>
                        <Option value='2'>图书</Option>
                    </Select>
                </Item>
                <Item
                    label="categoryName"
                    name="categoryName"
                    rules={[{ required: true, message: '请输入分类名称' }]}>
                    <Input placeholder="请输入分类名称" />
                </Item>

            </Form >
        )
    }
}

export default Form.create()(AddForm)