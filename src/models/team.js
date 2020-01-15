import teamService from '../services/team';
export default {
  namespace: 'team',
  state: {
    list: [],
    current: 1,
    pageSize: 10,
    total: 0,
  },

  effects: {
    *search({ payload = {} }, { call, put }) {
      const data = yield call(teamService.search, payload);
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *add({ payload = {} }, { call, put }) {
      const res = yield call(teamService.add, payload);
      return res;
    },

    *edit({ payload = {} }, { call, put }) {
      const res = yield call(teamService.edit, payload);
      return res;
    },

    *del({ payload = {} }, { call, put }) {
      const res = yield call(teamService.del, payload);
      return res;
    },
  }, // end of effects

  reducers: {
    save(state, { payload }) {
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
