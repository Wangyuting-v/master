import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response1 = yield call(fakeAccountLogin, payload);
      const { code, data, message, success } = response1;
      if (success) {
        const response = {
          currentAuthority: 'admin',
          status: 'ok',
          type: 'account',
        };
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        console.log('response--------', response);
        if (response.status === 'ok') {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);

            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }

          router.replace(redirect || '/');
        }
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      localStorage.removeItem('userid');
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
