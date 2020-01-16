import request from '../utils/requestBySso';
import { obj2params } from '../utils/utils';

async function search({ currentPage = 1, pageSize = 20, putArea = '' }) {
  let url = `/ads?pageNumber=${currentPage}&pageSize=${pageSize}`;

  if (putArea && putArea.trim().length > 0) {
    url += `&putArea=${putArea.trim()}`;
  }
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

export default {
  search,
};
