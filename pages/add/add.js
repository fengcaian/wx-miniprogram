// pages/cart/cart.js
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
          selected: 1
        });
      }
      this.setData({
        navHeight: App.globalData.navHeight
      });
    }
  },

  webviewMessage(e) {
    console.log(e.detail.data[0].openId);
  },
})