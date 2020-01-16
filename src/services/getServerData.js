import request from '../utils/request';
import requestBySso from '../utils/requestBySso';

function obj2params(obj) {
  let result = '';
  let item;
  for (item in obj) {
    if ((obj[item] && String(obj[item])) || String(obj[item]) == 'false') {
      result += `&${item}=${obj[item]}`;
    }
  }

  if (result) {
    result = result.slice(1);
  }

  return result;
}

function obj2paramsarr(key, arr) {
  let result = '';
  for (var i = 0; i < arr.length; i++) {
    result += `&${key}=${arr[i]}`;
  }
  return result;
}

// export async function getServerByget(url) {
//   let resp = await request(url);
//   if (resp.code !== undefined && resp.code !== undefined) {
//     resp = resp.data || {};
//   }
//   return resp;
// }

export async function getServerByGet(url, data) {
  let resp;
  if (obj2params(data)) {
    resp = await request(`${url}?${obj2params(data)}`);
  } else {
    resp = await request(url);
  }

  return resp;
}

export async function getServerBypost(url, data) {
  const resp = await request(url, {
    method: 'POST',
    body: data,
  });
  return resp;
}

export async function getServerByput(url, data) {
  const resp = await requestBySso(url, {
    method: 'PUT',
    body: data,
  });
  return resp;
}
export async function getServerBydelete(url, data) {
  const resp = await requestBySso(url, {
    method: 'DELETE',
    body: data,
  });
  return resp;
}

// export async function getServerByExpont(url, data) {
//   let resp;
//   if (obj2params(data)) {
//     resp = await requestExpon(`${url}?${obj2params(data)}`);
//   } else {
//     resp = await requestExpon(url);
//   }
//
//   return resp;
// }

export async function getServerBySsoLogout(url, data) {
  const resp = await requestBySso(url, {
    method: 'POST',
    body: data,
  });
  return resp;
}
export async function getServerBySsoPut(url, data) {
  const resp = await requestBySso(url, {
    method: 'PUT',
    body: data,
  });
  return resp;
}
export async function getServerBySsoGet(url, data) {
  let resp;
  if (obj2params(data)) {
    resp = await requestBySso(`${url}?${obj2params(data)}`);
  } else {
    resp = await requestBySso(url);
  }

  return resp;
}

export async function getServerBySsoGetArr(url, data) {
  let resp;
  if (data.value && data.value.length > 0) {
    resp = await requestBySso(`${url}?${obj2paramsarr(data.key, data.value)}`);
  } else {
    resp = await requestBySso(url);
  }

  return resp;
}

export async function getServerBySsodelete(url, data) {
  const resp = await requestBySso(url, {
    method: 'DELETE',
    body: data,
  });
  return resp;
}
