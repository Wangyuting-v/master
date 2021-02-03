import userListService from '../services/userList';

export default {
  namespace: 'userList',
  state: {
    list: [],
    current: 1,
    pageSize: 10,
    total: 0,
  },

  effects: {
    *search({ payload = {} }, { call, put }) {
      console.log('payload========', payload);
      const data = yield call(userListService.search, payload);
      yield put({
        type: 'saveSearchedStaffs',
        payload: data,
      });
    },
  },

  reducers: {
    saveSearchedStaffs(state, { payload }) {
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
