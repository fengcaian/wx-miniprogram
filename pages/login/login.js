// pages/login/login.js
import http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var app = getApp();
    this.setData({
      navHeight: app.globalData.navHeight
    });
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
      console.log('login');
    }
  },
  onShow() {
    
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})