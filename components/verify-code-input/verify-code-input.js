// components/verify-code-input/verify-code-input.js
import http from '../../utils/http.js';
import * as API from '../../utils/api.js';
Component({
  properties: {
    phone:{
      type: String,
      value: ''
    },
    verifyCode: {
      type: String,
      value: ''
    },
    smsValidateType: String
  },
  data: {
    countDownClock: 60, // 验证码倒计时
  },
  methods: {
    showTCaptcha() {
      if (!this.data.phone) {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return;
      }
      http({
        url: API.phoneV2SendMessage,
        method: 'post'
      }).then((res) => {
        if (res.msg === 'need_generate_captcha' || res.msg === 'captcha_not_pass') {
          this.selectComponent('#captcha').show();
        }
      }, (err) => {
        console.log('err', err);
      });
    },
    // 验证码验证结果回调
    handlerVerify(ev) {
      // 如果使用了 mpvue，ev.detail 需要换成 ev.mp.detail
      if(ev.detail.ret === 0) {
          // 验证成功
          console.log('ticket:', ev.detail.ticket);
          this.getVerifyCode(ev.detail.ticket);
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
    },
    getVerifyCode(ticket) {
      http({
        url: `${API.phoneV2SendMessage}?ticket=${encodeURIComponent(ticket)}`,
        method: 'post',
        data: {
          account: this.data.phone,
          smsValidateType: this.data.smsValidateType,
          ticket,
        },
        header: {
          'Content-type': 'application/json'
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
    inputVerifyCode(e) {
      this.triggerEvent('inputVerifyCode', e);
    }
  }
})
