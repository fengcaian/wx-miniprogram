// pages/forget-password/forget-password.js
import http from '../../utils/http.js';
import * as API from '../../utils/api.js';
import * as verifyUtil from '../../utils/constants/verify-util.js';
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: '',
    showActionsheet: false,
    groups: [
      { text: '中国大陆', value: 86 },
      { text: '中国澳门', value: 853 },
      { text: '中国台湾', value: 886 },
      { text: '中国香港', value: 852 }
    ],
    areaCode: '86',
    phone: '1326589789',
    phoneValidPass: false,
    checkCode: '13246',
    checkCodeValidPass: false,
    paramsValidPass: false, // 参数是否全部校验通过
    countDownClock: 60, // 验证码倒计时
    error: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      navHeight: App.globalData.navHeight
    });
  },
  showAreaCodeActionSheet() {
    this.setData({
      showActionsheet: true
    });
  },
  selectAreaCodeActionSheet({detail: {value}}) {
    this.setData({
      showActionsheet: false,
      areaCode: value
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
  getCheckCode(ticket) {
    const params = {
      account: this.data.phone,
      ticket,
    };
    http({
      url: API.phoneV2SendMessage,
      method: 'get',
      data: {
        account: this.data.phone,
        ticket,
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
    const params = {
      account: '',
      password: '',
      source: '',
      isPhone: ''
    };
    http({
      url: API.phonePasswordStep1,
      method: 'post',
      data: {
        phone: this.data.phone,
        checkCode: this.data.checkCode
      },
    }).then((res) => {
      console.log('success');
      console.log(res);
      wx.navigateTo({url: '/pages/set-password/set-password'});
    }, (err) => {
      console.log('err', err);
    });
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
  showTCaptcha() {
    this.selectComponent('#captcha').show();
  },
  // 验证码验证结果回调
  handlerVerify(ev) {
      // 如果使用了 mpvue，ev.detail 需要换成 ev.mp.detail
      if(ev.detail.ret === 0) {
          // 验证成功
          console.log('ticket:', ev.detail.ticket);
          this.getCheckCode(ev.detail.ticket);
      } else {
          // 验证失败
          // 请不要在验证失败中调用refresh，验证码内部会进行相应处理
      }
  },    
  // 验证码准备就绪
  handlerReady() {
      console.log('验证码准备就绪')
  },    
  // 验证码弹框准备关闭
  handlerClose() {
      console.log('验证码弹框准备关闭')
  },
  // 验证码出错
  handlerError(ev) {
      console.log(ev.detail.errMsg)
  }
})