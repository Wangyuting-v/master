import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('http://122.51.140.39:2435/sysUser/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
