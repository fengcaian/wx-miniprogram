// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log('login');
    //     console.log(res);
    //   }
    // })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight);//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.menuButtonHeight = menuButtonObject.height;
      },
      fail(err) {
        console.log(err);
      }
    });
    //初始化加载，先判断用户登录状态
    // if (wx.getStorageSync('user')) {
    //   wx.switchTab({
    //       url: 'pages/index/index'
    //   })
    // } else {
    //     wx.reLaunch({
    //         url: 'pages/login/login'
    //     })
    // }
  },
  globalData: {
    userInfo: null,
    authList: ['xiaoming', 'xiaohong', 'xiaohua'],
  }
})
