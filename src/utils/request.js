// import interfaces from '../interfaces';

// export default async function request(options) {
//   options.data.session3rd = await wepy.getStorageSync('session3rd')

//   let response = await wepy.request(options)

//   if (response.data.status === 9) {
//     await interfaces.login()
//     // 这里如果登录拒绝，不会再次发起请求
//     // 兼容小程序拒绝授权
//     const authStatus = await interfaces.getUserAuthStatus()
//     if (authStatus) {
//       return await request(options)
//     }
//     return false
//   } else if (response.statusCode === 500) {
//     wepy.showModal({
//       showCancel: false,
//       title: '提示',
//       content: `服务器错误。${response.data.errmsg}`
//     })
//   } else {
//     return response
//   }
// }

import Fly from 'flyio';
import wx from './wx';

const request = new Fly();

request.config.timeout = 10 * 1000;

request.config.baseURL = process.env.API === 'proxy' ? 'http://localhost:3006' : '/';

request.interceptors.request.use((req) => {
  wx.showLoading({
    title: '拼命加载中...',
  });
  // 设置全局 headers
  const session3rd = wx.getStorageSync('session3rd');
  req.headers['x-session3rd'] = session3rd;
  req.headers['content-type'] = 'application/x-www-form-urlencoded';
  return req;
});

request.interceptors.response.use(
  (res, promise) => {
    wx.hideLoading();
    return promise.resolve(res.data);
  },
  (err, promise) => {
    wx.hideLoading();
    wx.showToast({
      title: err.message,
      icon: 'none',
    });
    return promise.resolve();
  },
);

export default request;
