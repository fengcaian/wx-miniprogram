// pages/forget-password/forget-password.js
import http from '../../utils/http.js';
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    phoneValidPass: false,
    checkCode: '',
    checkCodeValidPass: false,
    paramsValidPass: false, // 参数是否全部校验通过
    countDownClock: 60, // 验证码倒计时
    buttons: [],
    showSlideValidDialog: false,
    x: 0,
    area_width: 85,   //可滑动区域的宽，单位是百分比，设置好后自动居中
    box_width: 120,   //滑块的宽,单位是 rpx
    maxNum: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      navHeight: App.globalData.navHeight
    });
  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    });
    if (e.detail.value === '') {
      this.setData({
        phoneValidPass: false,
        paramsValidPass: false,
      });
      return;
    }
    this.setData({
      phoneValidPass: true,
      paramsValidPass: this.data.checkCodeValidPass && true
    });
  },
  inputCheckCode(e) {
    this.setData({
      checkCode: e.detail.value
    });
    if (e.detail.value === '') {
      this.setData({
        checkCodeValidPass: false,
        paramsValidPass: false,
      });
      return;
    }
    this.setData({
      checkCodeValidPass: true,
      paramsValidPass: this.data.phoneValidPass && true
    });
  },
  getCheckCode() {
    this.setData({
      showSlideValidDialog: true
    });
    http({
      url: 'http://127.0.0.1:7001/test',
      method: 'get',
      data: {
        phone: this.data.phone
      },
    }).then((res) => {
      let timer = setInterval(() => {
        this.setData({
          countDownClock: this.data.countDownClock - 1
        });
        if (this.data.countDownClock === 0) {
          clearInterval(timer);
          this.setData({
            countDownClock: 60
          });
        }
      }, 1000);
    }, (err) => {
      console.log('err', err);
    });
  },
  tapDialogButton(e) {
    this.setData({
      showSlideValidDialog: false,
    })
  },
  next() {
    if (!/^([1-9]\d{10})$/.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none'
      });
      return;
    }
    if (!/^(\d{6})$/.test(this.data.checkCode)) {
      wx.showToast({
        title: '验证码格式有误！',
        icon: 'none'
      });
      return;
    }
    http({
      url: 'http://127.0.0.1:7001/test',
      method: 'get',
      data: {
        phone: this.data.phone,
        checkCode: this.data.checkCode
      },
    }).then((res) => {
      console.log('success');
      console.log(res);
    }, (err) => {
      console.log('err', err);
    });
  },
  drag(e) {
    var that = this;
    coord = e.detail.x;
  },
  dragOver(e) {
 
    var that = this;
    if (coord >= that.data.maxNum) {
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 2000
      })
      //验证成功之后的代码
    } else {
      that.setData({
        x: 0,
      })
    }
    console.log(this.data.x)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        var n = Math.floor(res.windowWidth * that.data.area_width / 100 - that.data.box_width / 2)
        that.setData({
          maxNum: n,
        })
      }
    })
  },
  login: function () {
    this.selectComponent('#captcha').show()
    // 进行业务逻辑，若出现错误需重置验证码，执行以下方法
    // if (!this.data.error) {
    //   this.selectComponent('#captcha').refresh()
    // }
  },
  // 验证码验证结果回调
  handlerVerify: function (ev) {
      // 如果使用了 mpvue，ev.detail 需要换成 ev.mp.detail
      if(ev.detail.ret === 0) {
          // 验证成功
          console.log('ticket:', ev.detail.ticket);
          console.log('ticket:', ev.detail)
      } else {
          // 验证失败
          // 请不要在验证失败中调用refresh，验证码内部会进行相应处理
      }
  },    
  // 验证码准备就绪
  handlerReady: function () {
      console.log('验证码准备就绪')
  },    
  // 验证码弹框准备关闭
  handlerClose: function () {
      console.log('验证码弹框准备关闭')
  },
  // 验证码出错
  handlerError: function (ev) {
      console.log(ev.detail.errMsg)
  },
  toTCaptcha: function () {
    wx.navigateToMiniProgram({
      appId: 'wx5a3a7366fd07e119',
      path: '/pages/index/index',
      extraData: {
        appId: 'wxb302e0fc8ab232b4' //您申请的验证码的 appId
      }
    })
  }
})