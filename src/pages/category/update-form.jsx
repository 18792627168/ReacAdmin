import React, { Component } from 'react';
import propTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Opriot = Select.Option


// 更新分类的form组件
class UpdateForm extends Component {
    // 接收父组件传递过来的参数
    static propTypes = {
        categoryName: propTypes.string.isRequired,
        setForm: propTypes.func.isRequired,
    }
    componentDidMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    render() {
        const { categoryName } = this.props
        return (
            <Form>
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

export default Form.create()(UpdateForm)