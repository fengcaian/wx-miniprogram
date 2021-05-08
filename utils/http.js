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
          resolve(res.data);
        } else {
          wx.showToast({
            title: res.data.msg || '出错了！',
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