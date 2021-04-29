import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option
// 这个是官网的例子
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

// 添加分类的form组件
class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.array.isRequired,    // 用来传递form对象的函数
        categorys: PropTypes.array.isRequired,  // 一级分类的数组
        parentId: PropTypes.array.isRequired,   // 父id
    }
    // let children = [];
    //     for(let i = 10; i < 36; i++) {
    //     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    // }

    componentDidMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { categorys, parentId } = this.props
        return (
            <Form>
                <Item>
                    <Select
                        label="parentId"
                        name="parentId"
                        rules={[{ required: true, message: '请选择分类' }]}
                        defaultValue={{ value: parentId }}>
                        <Option value='0'>一级</Option>
                        {/* {children} */}
                        {/* 现在写/教程内的（比较老） 这边需要了解react的for循环*/}
                        {
                            categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                        }
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