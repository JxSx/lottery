import React from 'react';
import { routerRedux } from 'dva/router';
import { Drawer } from 'antd';
import themes from '../utils/themes';

export default class LeftDrawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false//是否显示抽屉
    }
    this.index = 0;
  }

  render() {
    return <Drawer
      title="隐藏功能"
      placement='left'
      closable={true}
      onClose={this.props.onClose}
      visible={this.props.visible}
    >
      <div>
        <a onClick={() => {
          this.props.dispatch(routerRedux.push({
            pathname: '/data'
          }))
        }}>导入员工</a>
      </div>
      <div>
        <a onClick={() => {
          let index = (this.index++) % themes.length
          window.location = `#/?index=${index}`
        }}>切换动画</a>
      </div>
    </Drawer>
  }
}
