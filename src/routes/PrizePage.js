import React from 'react';
import styles from './PrizePage.css';
import { Form, Select, InputNumber, Input, Button, Table, message } from 'antd';
import { connect } from 'dva';


const FormItem = Form.Item;
const Option = Select.Option;
const Column = Table.Column;

const PRIZE_TYPE = [
  '一等奖', '二等奖', '三等奖', '四等奖', '五等奖',
]

class ParamsForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.props.prizes.some(item => item.type === values.type)) {
        message.info('请勿重复添加')
        return;
      }
      this.handleReset();
      values.typeName = PRIZE_TYPE[values.type]
      this.props.dispatch({
        type: 'lottery/addPrize',
        payload: {
          ...values
        }
      })
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return <Form layout="inline" onSubmit={this.handleSubmit}>
      <FormItem label="奖品类别">
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择' }],
        })(
          <Select style={{ width: '200px' }}>
            {
              PRIZE_TYPE.map((item, index) => {
                return <Option key={index}>{item}</Option>
              })
            }
          </Select>)}
      </FormItem>
      <FormItem label="奖品数">
        {getFieldDecorator('count', {
          rules: [{ required: true, message: '请输入' }],
        })(
          <InputNumber min={1} style={{ width: '200px' }} />)}
      </FormItem>
      <FormItem label="奖品名称">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入' }],
        })(
          <Input />)}
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit">保存</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
      </FormItem>
    </Form>
  }
}

const ParamsFormWrapper = Form.create()(ParamsForm);

class PrizePage extends React.Component {

  handleDelete = (type) => {
    this.props.dispatch({
      type: 'lottery/deletePrize',
      payload: {
        type
      }
    })
  }

  render() {
    console.log(this.props.prizes)

    return <div className={styles.container}>
      <ParamsFormWrapper {...this.props} />
      <hr style={{ margin: '20px 0' }} />
      <h3>清单</h3>
      <Table bordered dataSource={this.props.prizes} rowKey={record => record.type}>
        <Column title="奖品类别" key="typeName" dataIndex="typeName" />
        <Column title="奖品数" key="count" dataIndex="count" />
        <Column title="奖品名称" key="name" dataIndex="name" />
        <Column title="操作" key="x" dataIndex="" render={
          (text, record) => (<a onClick={() => this.handleDelete(record.type)}>删除</a>)} />
      </Table>
    </div>
  }
}

function mapStateToProps({ lottery }) {
  return {
    prizes: lottery.prizes
  }
}

export default connect(mapStateToProps)(PrizePage);