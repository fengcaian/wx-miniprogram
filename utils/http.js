const http = options => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: Object.assign({
        'content-type': 'application/x-www-form-urlencoded'
      }, options.header),
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            wx.showToast({
              title: res.data.msg || '网络异常，请稍后再试~',
              icon: 'none'
            });
            reject(res.data);
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后再试~',
            icon: 'none'
          });
          reject(res);
        }
      },
      fail: reject
    });
  });
};
export default http;