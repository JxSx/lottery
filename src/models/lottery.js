import { EMPLOYEE } from '../utils/employee';
import * as Utils from '../utils/shuffle';
import { delay } from 'dva/saga';
import { message } from 'antd';

export default {

  namespace: 'lottery',

  state: {
    originEmployees: [],//原始员工
    employees: [], //洗牌后的员工
    luckyGuies: [], //中奖员工
    prizes: [], //所有奖品
    luckyGuy: null,//幸运儿
    rolling: false,//是否正在滚动抽奖中
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
      });
    },
  },

  effects: {
    *init({ payload }, { put }) {  // eslint-disable-line
      let value = sessionStorage.getItem('employees');
      if (value) {
        let originEmployees = JSON.parse(value);
        let ignoreIds = [];
        originEmployees && originEmployees.forEach(item => {
          if (!item.weight) {
            ignoreIds.push(item.id)
          }
        })
        console.log(ignoreIds)
        yield put({
          type: 'save',
          payload: {
            originEmployees,
            ignoreIds
          }
        })
      }
    },
    *shuffle({ payload }, { put }) {
      let copyArr = [...EMPLOYEE];
      Utils.shuffle(copyArr);
      yield put({
        type: 'save',
        payload: {
          employees: copyArr
        }
      })
    },
    *rollUp({ payload }, { call, put, select }) {
      const { rolling, originEmployees, luckyGuies } = yield select(state => state.lottery);
      if (originEmployees.length <= 0) {
        message.error('请先导入数据')
        return;
      }
      yield put({
        type: 'save',
        payload: {
          rolling: !rolling,
        }
      });
      // 通过url控制动画的显示和隐藏
      window.location = '#/?index=0'
      if (rolling) {
        window.location = '#/?index=3'
        // 点击“停止”，不执行循环
        return;
      }
      //过滤掉已中奖员工
      let extraArr = [];
      const ids = luckyGuies.map(item => (item.id));
      let copyArr = originEmployees.filter(item => {
        if (ids.indexOf(item.id) === -1) {
          if (item.weight) {
            for (let i = 0; i < item.weight; i++) {
              extraArr.push(item);
            }
          }
          return true;
        }
        return false;
      });

      copyArr = copyArr.concat(extraArr);

      console.log(copyArr)
      Utils.shuffle(copyArr);
      while (true) {
        yield call(delay, 50);
        let luckyIndex = Math.floor(Math.random() * copyArr.length);
        yield put({
          type: 'save',
          payload: {
            luckyGuy: copyArr[luckyIndex]
          }
        })
        const {
          rolling
        } = yield select(state => state.lottery);
        if (!rolling) {
          const {
            ignoreIds
          } = yield select(state => state.lottery);
          //判断ignore员工，不可被选中
          if (ignoreIds.indexOf(copyArr[luckyIndex].id) !== -1) {
            while (true) {
              yield call(delay, 50);
              luckyIndex = Math.floor(Math.random() * copyArr.length);
              yield put({
                type: 'save',
                payload: {
                  luckyGuy: copyArr[luckyIndex]
                }
              })
              if (ignoreIds.indexOf(copyArr[luckyIndex].id) === -1) {
                break;
              }
            }
          }
          let { luckyGuies } = yield select(state => state.lottery);
          luckyGuies.push(copyArr[luckyIndex]);
          console.log(luckyGuies)
          //退出循环之前，将抽中的幸运儿保存
          yield put({
            type: 'save',
            payload: {
              luckyGuies: luckyGuies
            }
          });
          break
        }
      }
    },
    *addPrize({ payload }, { put, select }) {
      let { prizes } = yield select(state => state.lottery);
      prizes.push(payload);
      yield put({
        type: 'save',
        payload: {
          prizes: [...prizes]
        }
      })
    },
    *deletePrize({ payload }, { put, select }) {
      let { prizes } = yield select(state => state.lottery);
      let list = prizes.filter(item => item.type !== payload.type);
      yield put({
        type: 'save',
        payload: {
          prizes: list
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};