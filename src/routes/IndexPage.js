import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import LeftDrawer from '../components/LeftDrawer';

class IndexPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false//是否显示抽屉
    }
    this.lastTime = 0;
  }

  onShuffle = () => {
    this.props.dispatch({
      type: 'lottery/shuffle',
    })
  }

  onRollUp = () => {
    this.props.dispatch({
      type: 'lottery/rollUp'
    })
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return <div className={styles.normal}>
      <div className={styles.content}>
        <div className={styles.lucky}>
          {this.props.luckyGuy ? this.props.luckyGuy.name : "等待开奖"}
        </div>
        {/* <div className={styles.footer}>
          <Button onClick={this.onRollUp}>抽奖</Button>
        </div> */}
      </div>

      <div className={styles.drawerTrigger} onClick={this.showDrawer} />
      <LeftDrawer
        {...this.props}
        visible={this.state.visible}
        onClose={this.onClose}
      />
    </div >
  }


  enterEvent = (e) => {
    let nextTime = Date.now();
    if(this.lastTime !== 0 && nextTime - this.lastTime < 1000){
      return;
    }
    this.lastTime = nextTime;
    if (e.which === 13) {
      this.onRollUp()
    }
  }
  
  componentWillUnmount(){
    window.removeEventListener('keypress', this.enterEvent);
  }

  componentDidMount() {
    window.addEventListener('keypress', this.enterEvent)
    this.props.dispatch({
      type: 'lottery/init'
    })
  }
}

function mapStateToProps({ lottery }) {
  return {
    ...lottery
  };
};

export default connect(mapStateToProps)(IndexPage);