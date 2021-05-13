// pages/set-password/set-password.js
const computedBehavior = require('miniprogram-computed').behavior;
const MD5 = require('MD5');
import http from '../../utils/http.js';
import * as API from '../../utils/api.js';
import * as keyMap from '../../utils/constants/key-map.js';
const App = getApp();
Component({
  behaviors: [computedBehavior],
  data: {
    navHeight: '',
    password: '',
    passwordInputType: 'password',
    passwordInputIcon: 'eyes-off',
    repeatPassword: '',
    repeatPasswordInputType: 'password',
    repeatPasswordInputIcon: 'eyes-off',
    errorLabel: ''
  },
  computed: {
    btnDisabled(data) {
      return !data.password || !data.repeatPassword;
    }
  },

  pageLifetimes: {
    show() {
      this.setData({
        navHeight: App.globalData.navHeight
      });
    },
  },

  methods: {
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
    submit() {
      if (this.data.password !== this.data.repeatPassword) {
        this.setData({
          errorLabel: '两次输入不一致'
        });
        return;
      }
      http({
        url: API.phoneRegisterStep3,
        method: 'get',
        data: {
          password: MD5(this.data.password),
          registerUuid: ''
        },
      }).then((res) => {
        console.log('success');
        console.log(res);
        wx.switchTab({url: '/pages/login/login'});
      }, (err) => {
        console.log('err', err);
      });
    }
  }
})