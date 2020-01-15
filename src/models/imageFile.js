import ImageService from '../services/ImageService';

export default {
  namespace: 'imageFile',

  state: {
    uploadToken: '',
    filekey: '',
    accessURL: '',
  },

  effects: {
    *fetchUploadToken({ payload = {} }, { call, put }) {
      const data = yield call(ImageService.getUploadToken, payload);
      yield put({
        type: 'save',
        payload: { ...data },
      });

      if (payload.callback) {
        payload.callback(payload.file);
      }
    },
    *upload({ payload = {} }, { call, put }) {
      const data = yield call(ImageService.upload, payload);
      yield put({
        type: 'save',
        payload: {
          ...data,
        },
      });
    },
  }, // end of effects

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }, // end of reducers
};
