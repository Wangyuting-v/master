import request from '../utils/requestBySso';
import { obj2params } from '../utils/utils';
import moment from 'moment';

async function search({ currentPage = 1, pageSize = 10, username, mobile, address }) {
  let url = `http://122.51.140.39:2435/appointmentInfo?pageNumber=${currentPage}&pageSize=${pageSize}`;
  if (username && username.trim().length > 0) {
    url += `&username=${username.trim()}`;
  }
  if (mobile && mobile.trim().length > 0) {
    url += `&mobile=${mobile.trim()}`;
  }
  if (address && address.trim().length > 0) {
    url += `&address=${address.trim()}`;
  }
  let resp = await request(url);
  if (resp.code !== undefined && resp.code !== undefined) {
    resp = resp.data || {};
  }
  const { list = [] } = resp;
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      list[i].createTime = moment(list[i].createTime).format('YYYY-MM-DD HH:mm');
    }
  }
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
