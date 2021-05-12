// pages/login/login.js
const MD5 = require('MD5');
import http from '../../utils/http.js';
import * as API from '../../utils/api.js';
import * as verifyUtil from '../../utils/constants/verify-util.js';
const App = getApp();
Page({
  data: {
    navHeight: '',
    account: '',
    password: '',
    phone: '',
    areaCode: '86',
    loginType: 'account',
    smsValidateType: 'dynamic_login'
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: App.globalData.tabbarSelected
      });
    }
    this.setData({
      navHeight: App.globalData.navHeight
    });
  },

  inputAccount(e) {
    this.setData({
      account: e.detail.value
    });
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },

  login() {
    const params = {
      account: this.data.account,
      password: MD5(this.data.password),
      source: 'operate_source_xgj_wx_program'
    };
    http({
      url: API.phoneV2Login,
      method: 'post',
      data: verifyUtil.sortParam(params),
      header: {
        'Content-type': 'application/json'
      },
    }).then((res) => {
      console.log('success');
      console.log(res);
      if (res.msg) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
        if (res.result.length === 1) {
          wx.setStorage({
            key: 'isLoginCustomerFlag',
            data: res.result[0].customerCode
          });
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    }, (err) => {
      console.log('err', err);
    });
  },
  wechatLogin() {
    console.log(44);
    wx.getUserProfile({
      desc: '用于展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        http({
          url: 'http://127.0.0.1:7001/test',
          method: 'get',
        }).then((res) => {
          console.log('success');
          console.log(res);
        }, (err) => {
          console.log('err', err);
        });
      },
      fail: res => {
        console.log(2);
        console.log(res)
        //拒绝授权
        wx.showToast({
          title: '您拒绝了请求,不能正常使用小程序',
          icon: 'error',
          duration: 2000
        });
        return;
      }
    });
  },
  forgetPassword() {
    console.log('forgetPassword');
    wx.navigateTo({url: '/pages/forget-password/forget-password'});
  },
  switchLoginType(e) {
    this.setData({
      loginType: e.target.dataset.logintype === 'account' ? 'phone' : 'account'
    });
  },
  register() {
    wx.navigateTo({url: '/pages/forget-password/forget-password'});
  }
})