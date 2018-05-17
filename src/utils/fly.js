// 对于微信小程序，必须引用 flyio/dist/npm/wx
import Fly from 'flyio/dist/npm/wx';
import stringify from 'qs/lib/stringify';
import wx from './wx';

const fly = new Fly();

fly.config.timeout = 10 * 1000;

fly.config.baseURL = process.env.API === 'proxy' ? 'http://localhost:3006' : '/';

fly.interceptors.request.use((req) => {
  wx.showLoading({
    title: '拼命加载中...',
  });
  const session3rd = wx.getStorageSync('session3rd');
  /**
   * 后端通过请求 header 中 x-session3rd 来进行用户验证
   */
  req.headers['x-session3rd'] = session3rd;

  /**
   * 注意：
   * 如果配置 content-type:application/x-www-form-urlencoded，
   * 就需要对表单数据进行 qs.stringify
   * 如果是json，直接删除以下两行就好
   */
  req.headers['content-type'] = 'application/x-www-form-urlencoded';
  req.body = stringify(req.body);

  return req;
});

fly.interceptors.response.use(
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

export default fly;
