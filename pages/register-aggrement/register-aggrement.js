// pages/register-aggrement/register-aggrement.js
const App = getApp();
Page({
  data: {
    navHeight: ''
  },
  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight
    });
  },
})