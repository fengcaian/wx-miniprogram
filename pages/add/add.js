// pages/cart/cart.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: ''
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

  webviewMessage(e) {
    console.log(e.detail.data[0].openId);
  },
})