import request from '../utils/requestBySso';
import { obj2params } from '../utils/utils';
import moment from 'moment';

async function search({
  currentPage = 1,
  pageSize = 10,
  mobile,
  userName,
  userCode,
}) {
  let url = `https://titian.sugercd.com/user?pageNumber=${currentPage}&pageSize=${pageSize}`;
  if (mobile && mobile.trim().length > 0) {
    url += `&mobile=${mobile.trim()}`;
  }
  if (userName && userName.trim().length > 0) {
    url += `&userName=${userName.trim()}`;
  }
  if (userCode && userCode.trim().length > 0) {
    url += `&userCode=${userCode.trim()}`;
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
