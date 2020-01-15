import * as qiniu from 'qiniu-js';
import request from '../utils/requestByFile';

function obj2params(obj) {
  let result = '';
  let item;
  for (item in obj) {
    if (obj[item] && String(obj[item])) {
      result += `&${item}=${obj[item]}`;
    }
  }

  if (result) {
    result = result.slice(1);
  }

  return result;
}
async function upload({ file, onProgress }) {
  const url = `http://122.51.140.39:2435/file/minio/upload?fileName=${file.name}`;
  // const url = `http://122.51.140.39:2435/file/minio/upload?${obj2params(file)}`;

  let resp = await request(url);
  if (resp.code !== undefined && resp.code !== undefined) {
    resp = resp.data || {};
  }
  console.log('resp====', resp);
  const { uploadToken, filekey, accessURL } = resp;
  const observable = qiniu.upload(file, filekey, uploadToken);
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next(loading) {
        const { percent } = loading.total;
        if (onProgress) {
          onProgress(percent);
        }
      },
      error(err) {
        reject(err);
      },
      complete() {
        resolve({
          accessURL,
          filekey,
        });
      },
    }); // end of subscribe()
  });
}

async function getUploadToken({ fileName }) {
  const url = `/dbcode/up/token?&fileName=${fileName}`;

  let resp = await request(url);
  // todo: move this to `request` module
  if (resp.code !== undefined && resp.code !== undefined) {
    resp = resp.data || {};
  }
  const date = new Date();
  return {
    name: fileName,
    status: 'done',
    uid: date.getTime() + Math.random(),
    ...resp,
  };
}
export default {
  upload,
  getUploadToken,
};
