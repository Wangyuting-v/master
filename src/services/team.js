import request from '../utils/requestBySso';
import { obj2params } from '../utils/utils';

async function search({ pageSize, pageNumber, sort, id }) {
  let url = `/raceTeam?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}&raceZoneId=${id}`;

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
  let url = `/raceTeam`;

  let resp = await request(url, { method: 'POST', body: params });
  return resp;
}

async function edit(params) {
  let url = `/raceTeam`;

  let resp = await request(url, { method: 'PUT', body: params });
  return resp;
}

async function del(id) {
  let url = `/raceTeam/${id}`;

  let resp = await request(url, { method: 'DELETE' });
  return resp;
}

export default {
  search,
  add,
  edit,
  del,
};
