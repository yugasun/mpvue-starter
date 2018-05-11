import request from '@/utils/request';
import {
  login,
  getUserInfo,
  getSetting,
  getStorage,
  setStorage,
  uploadFile,
} from '@/utils/wechat';
import wx from '@/utils/wx';
import api from './api';

const interfaces = {
  /**
   * 小程序登录授权，获取微信用户信息
   */
  async getWxUserInfo() {
    try {
      // 判断用户是否允许授权
      const loginData = await login();
      const userInfo = await getUserInfo();
      userInfo.code = loginData.code;
      return userInfo;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  /**
   * 用户登录接口
   */
  async login() {
    try {
      // 1. 检查用户是否拒绝授权
      const { authSetting } = await getSetting();
      // 如果没被授权，则强制进入授权页
      if (
        authSetting['scope.userInfo'] !== undefined
        && authSetting['scope.userInfo'] === false
      ) {
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '请允许小程序获取用户信息！',
          success() {
            wx.openSetting();
          },
        });
      }
      // 2. 获取用户信息
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
      const userInfo = await request(
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
      await setStorage('session3rd', userInfo.data.session3rd);
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

  async getUserInfo() {
    const res = await request(
      api.user.userInfo.url,
      null,
      {
        method: api.user.userInfo.method,
      },
    );
    if (res.status === 1) { // 获取成功
      return res.data;
    }
    wx.showModal({
      showCancel: false,
      title: '提示',
      content: '获取用户信息失败，请关闭重新进入。',
    });
    return false;
  },

  /**
   * 上传图片
   * @param {String} filePath 微信选择图片路径
   */
  async uploadFile(filePath) {
    try {
      const session3rd = await getStorage('session3rd');
      const res = await uploadFile(
        api.picture.upload.url,
        'file',
        filePath,
        {},
        {
          'x-session3rd': session3rd,
        },
      );
      return JSON.parse(res.data);
    } catch (e) {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: `提交信息失败。${e.message}`,
      });
      return false;
    }
  },

  /**
   * 提交表单数据
   * @param {Object} data
   */
  async submitFormData(submitKey, data) {
    wx.showLoading({
      title: '提交中',
    });
    try {
      const res = request(
        api.form.submit.url,
        {
          pic: data.picUrl || '',
          order_id: data.orderId || '',
          name: data.realname,
          addr: data.address,
          mobile: data.mobile,
        },
        {
          method: api.form.method,
        },
      );
      wx.hideLoading();
      return res;
    } catch (e) {
      wx.hideLoading();
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: `提交信息失败。${e.message}`,
      });
      return false;
    }
  },

  async share() {
    try {
      const res = await request(
        api.user.share.url,
        null,
        {
          method: api.user.share.method,
        },
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  },
};

export default interfaces;
