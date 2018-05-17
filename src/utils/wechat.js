/*
 * 对 wx 原生 api 的 promise 封装
 *
 * @Author: yugasun
 * @Email: yuga.sun.bj@gmail.com
 * @Date: 2018-05-11 15:27:03
 * @Last Modified by: yugasun
 * @Last Modified time: 2018-05-16 18:49:14
 */

import wx from './wx';

/**
 * 获取临时登录凭证（code）
 */
export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * 获取用户信息
 * 注意：https://developers.weixin.qq.com/miniprogram/dev/api/open.html#wxgetuserinfoobject
 * 此接口有调整，使用该接口将不再出现授权弹窗，
 * 请使用 <button open-type="getUserInfo"></button> 引导用户主动进行授权操作
 */
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * 获取用户的当前设置。
 */
export function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果。
 */
export function openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * 缓存键值对
 * @param {string} key 本地缓存中的指定的 key
 * @param {*} data 需要存储的内容
 */
export function setStorage(key, data) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * 获取本地缓存值
 * @param {string} key 本地缓存中指定的 key
 */
export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 *
 * @param {string} url 开发者服务器url
 * @param {string} name 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @param {string} filePath 要上传文件资源的路径
 * @param {object} formData HTTP 请求中其他额外的 form data
 */
export function uploadFile(url, name, filePath, formData, header = {}) {
  wx.showLoading('上传中...');
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      name,
      filePath,
      formData,
      header,
      success: resolve,
      fail: reject,
      complete() {
        wx.hideLoading();
      },
    });
  });
}

/**
 * 从本地相册选择图片或使用相机拍照
 * @param {number} count 最多可以选择的图片张数，默认9
 * @param {array} sizeType original 原图，compressed 压缩图，默认二者都有
 * @param {array} sourceType album 从相册选图，camera 使用相机，默认二者都有
 */
export function chooseImage(
  count = 9,
  sizeType = ['original', 'compressed'],
  sourceType = ['album', 'camera'],
) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * 预览图片
 * @param {string} current 当前显示图片的链接，不填则默认为 urls 的第一张
 * @param {array} urls 需要预览的图片链接列表
 */
export function previewImage(current, urls) {
  return new Promise((resolve, reject) => {
    wx.previewImage({
      current,
      urls,
      success: resolve,
      fail: reject,
    });
  });
}

export function navigateToMiniProgram(appId, path = '', extraData = {}) {
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId,
      path,
      extraData,
      success: resolve,
      fail: reject,
    });
  });
}
