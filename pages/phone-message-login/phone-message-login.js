// pages/phone-message-login/phone-message-login.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: '',
    phone: '',
    areaCode: '86'
  },
  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight
    });
  },
  login() {
    console.log(this.data.phone);
    console.log(this.data.areaCode);
  },
  onInputPhone(e) {
    console.log(e);
  }
})