// components/phone-input/phone-input.js
Component({
  properties: {
    phone:{
      type: String,
      value: ''
    },
    areaCode: {
      type: String,
      value: ''
    },
    groups: {
      type: String,
      value: [
        { text: '中国大陆', value: 86 },
        { text: '中国澳门', value: 853 },
        { text: '中国台湾', value: 886 },
        { text: '中国香港', value: 852 }
      ]
    }
  },
  data: {
    showActionsheet: false
  },
  methods: {
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
      this.triggerEvent('inputPhone', e);
    }
  }
})
