import request from '../utils/requestBySso';
import { obj2params } from '../utils/utils';

async function search({ searchValues = {}, currentPage = 1, pageSize = 20 }) {
  let url = `/ads?pageNumber=${currentPage}&pageSize=${pageSize}`;
  const { email } = searchValues;
  if (email && email.trim().length > 0) {
    url += `&email=${email.trim()}`;
  }
  let resp = await request(url);
  if (resp.code !== undefined && resp.code !== undefined) {
    resp = resp.data || {};
  }
  const { list = [] } = resp;
  console.log('list1122---', list);
  return {
    list,
    current: resp.pageNum,
    pageSize: resp.pageSize,
    total: resp.total,
  };
}

export default {
  search,
};
