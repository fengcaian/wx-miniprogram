// components/tabbar/tabbar.js
const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    useSlot:{
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    "showFlag": "display:none",
    "selected": 0,
    "color": "#767676",
    "selectedColor": "#71c000",
    "borderStyle": "white",
    "backgroundColor": "#fff",
    list: [
      {
        "pagePath": "/pages/index/index",
        "text": "工作台",
        "iconPath": "/assets/images/tab-bar/workspace.png",
        "selectedIconPath": "/assets/images/tab-bar/workspace.png"
      },
      {
        "pagePath": "/pages/add/add",
        "text": "新增",
        "iconPath": "/assets/images/tab-bar/add.png",
        "selectedIconPath": "/assets/images/tab-bar/add.png"
      },
      {
        "pagePath": "/pages/login/login",
        "text": "我的",
        "iconPath": "/assets/images/tab-bar/mine.png",
        "selectedIconPath": "/assets/images/tab-bar/mine.png"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url,
        success: () => {
          this.setData({
            selected: data.index
          });
          App.globalData.tabbarSelected = data.index;
          console.log('selected=', this.data.selected);
        }
      })
    }
  }
})
