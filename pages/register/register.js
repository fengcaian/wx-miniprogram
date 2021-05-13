// pages/register/register.js
const MD5 = require('MD5');
import http from '../../utils/http.js';
import * as API from '../../utils/api.js';
import * as keyMap from '../../utils/constants/key-map.js';
import * as verifyUtil from '../../utils/constants/verify-util.js';
const App = getApp();
Page({
  data: {
    navHeight: '',
    areaCode: '86',
    account: '',
    verifyCode: '',
    password: '',
    passwordInputType: 'password',
    passwordInputIcon: 'eyes-off',
    repeatPassword: '',
    repeatPasswordInputType: 'password',
    repeatPasswordInputIcon: 'eyes-off',
    errorLabel: '',
    smsValidateType: 'register_pc',
    paramsValidPass: false // 参数全部验证通过
  },
  onShow() {
    this.setData({
      navHeight: App.globalData.navHeight
    });
  },
  onInputPhone() {
    this.setData({
      paramsValidPass: this.data.account && this.data.verifyCode && this.data.password && !this.data.errorLabel
    });
  },
  register() {
    const params = {
      areaCode: this.data.areaCode,
      account: this.data.account,
      verifyCode: this.data.verifyCode,
      password: MD5(this.data.password)
    };
    console.log(params);
  },
  switchEye(e) {
    if (e.currentTarget.id === 'password') {
      this.setData({
        passwordInputType: this.data.passwordInputType === 'password' ? 'text' : 'password',
        passwordInputIcon: this.data.passwordInputIcon === 'eyes-on' ? 'eyes-off' : 'eyes-on'
      });
    } else {
      this.setData({
        repeatPasswordInputType: this.data.repeatPasswordInputType === 'password' ? 'text' : 'password',
        repeatPasswordInputIcon: this.data.repeatPasswordInputIcon === 'eyes-on' ? 'eyes-off' : 'eyes-on',
      });
    }
  },
  passwordInput(e) {
    if (this.data.password === this.data.repeatPassword) {
      this.setData({
        errorLabel: ''
      });
    }
  },
  passwordBlur(e) {
    if (e.target.dataset.name === 'password') {
      const regZh = new RegExp(keyMap.regZh, 'g');
      if (!keyMap.pwdReg.test(this.data.password) || regZh.test(this.data.password)) {
        this.setData({
          errorLabel: '需不少于8位的字母数字组合'
        });
      } else if (!this.data.repeatPassword) {
        this.setData({
          errorLabel: ''
        });
      }
    } else {
      if (this.data.password && this.data.repeatPassword) {
        if (this.data.password === this.data.repeatPassword) {
          this.setData({
            errorLabel: ''
          });
        } else {
          this.setData({
            errorLabel: '两次输入不一致'
          });
          return;
        }
        const regZh = new RegExp(keyMap.regZh, 'g');
        if (!keyMap.pwdReg.test(this.data.password) || regZh.test(this.data.password)) {
          this.setData({
            errorLabel: '需不少于8位的字母数字组合'
          });
        } else if (!this.data.repeatPassword) {
          this.setData({
            errorLabel: ''
          });
        }
      } else if (this.data.password && !this.data.repeatPassword) {
        this.setData({
          errorLabel: '两次输入不一致'
        });
      }
    }
  },
  userRegisterAggrement() {
    wx.navigateTo({
      url: '/pages/register-aggrement/register-aggrement',
    })
  },
})