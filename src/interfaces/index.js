import fly from '@/utils/fly';
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
} from '@/utils/wechat';
import wx from '@/utils/wx';
import api from './api';

const interfaces = {
  /**
   * 小程序登录授权，获取微信用户信息
   */
  async getWxUserInfo() {
    try {
      const loginData = await login();
      /**
       * 注意：
       * 如果是第一次进入，这里是会报错的
       * 参考：https://developers.weixin.qq.com/miniprogram/dev/api/open.html#wxgetuserinfoobject
       */
      const userInfo = await getUserInfo();
      userInfo.code = loginData.code;
      return userInfo;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  /**
   * 用户登录接口，与服务端交互，这里只是个demo
   */
  async login() {
    try {
      // 获取用户信息
      const userInfoRaw = await interfaces.getWxUserInfo();
      // 兼容小程序拒绝授权
      if (!userInfoRaw) {
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '获取用户信息失败，请关闭小程序重新进入',
        });
        return false;
      }
      const userInfo = await fly.request(
        api.user.login.url,
        {
          code: userInfoRaw.code,
          rawData: userInfoRaw.rawData,
          signature: userInfoRaw.signature,
          encryptedData: userInfoRaw.encryptedData,
          iv: userInfoRaw.iv,
        },
        {
          method: api.user.login.method,
        },
      );
      await setStorage('session3rd', userInfo.session3rd);
      return userInfo;
    } catch (e) {
      console.log(e);
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '获取用户信息失败，请关闭重新进入。',
      });
      return false;
    }
  },

  /**
   * 获取用户授权状态
   */
  async getUserAuthStatus() {
    try {
      const { authSetting } = await getSetting();
      let authStatus = authSetting['scope.userInfo'];
      if (authStatus === undefined) {
        authStatus = -1;
      }
      return authStatus;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export default interfaces;
