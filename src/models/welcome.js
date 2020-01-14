import welcomeService from '../services/welcome';

export default {
  namespace: 'welcome',
  state: {
    list: [],
    current: 1,
    pageSize: 10,
    total: 0,
  },

  effects: {
    *search({ payload = {} }, { call, put }) {
      const data = yield call(welcomeService.search, payload);
      console.log('data：', data);
      yield put({
        type: 'saveSearchedStaffs',
        payload: data,
      });
    },
  }, // end of effects

  reducers: {
    saveSearchedStaffs(state, { payload }) {
      console.log('payload', payload);
      const { list, current, pageSize, total } = payload;
      return {
        ...state,
        list,
        current,
        pageSize,
        total,
      };
    },
  },
};
