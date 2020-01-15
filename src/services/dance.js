import request from '../utils/requestBySso';
import { obj2params } from '../utils/utils';

async function search({ pageSize, pageNumber, sort }) {
  let url = `/raceZone?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}`;

  let resp = await request(url);
  if (resp.code !== undefined && resp.code !== undefined) {
    resp = resp.data || {};
  }
  const { list = [] } = resp;
  return {
    list,
    current: resp.pageNum,
    pageSize: resp.pageSize,
    total: resp.total,
  };
}

async function add(params) {
  let url = `/raceZone?${obj2params(params)}`;

  let resp = await request(url, { method: 'POST', body: params });
  return resp;
}

async function edit(params) {
  let url = `/raceZone?${obj2params(params)}`;

  let resp = await request(url, { method: 'PUT', body: params });
  return resp;
}

async function del(id) {
  let url = `/raceZone/${id}`;

  let resp = await request(url, { method: 'DELETE' });
  return resp;
}

export default {
  search,
  add,
  edit,
  del,
};
