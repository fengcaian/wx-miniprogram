// pages/login/login.js
import http from '../../utils/http.js';
const App = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: ''
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        });
      }
      this.setData({
        navHeight: App.globalData.navHeight
      });
    }
  },

  login() {},
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
})