import welcomeService from '../services/welcome';

export default {
  namespace: 'welcome',
  state: {
    list: [],
    current: 1,
    pageSize: 10,
    total: 0,
    listBanner: [],
  },

  effects: {
    *search({ payload = {} }, { call, put }) {
      const data = yield call(welcomeService.search, payload);

      if (payload.putArea) {
        yield put({
          type: 'saveBanner',
          payload: data,
        });
        return data;
      } else {
        yield put({
          type: 'saveSearchedStaffs',
          payload: data,
        });
      }
    },
  }, // end of effects

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
    saveBanner(state, { payload }) {
      const { list, total } = payload;
      return {
        ...state,
        listBanner: list,
        totalBanner: total,
      };
    },
  },
};
