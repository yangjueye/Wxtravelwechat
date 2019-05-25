const app = getApp()
var ip = app.globalData.ip
var openid = app.globalData.openid
Page({
  /* 设置初始值 */
  data: {
    communications: [],
  },
  /* 窗口加载事件 */
  onLoad: function (options) {
    var that = this;
    console.log('oload....');
    wx.request({
      url: ip + '/communication',
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          communications: res.data
        })
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },

  communicationsTab: function (e) {
    let i = e.target.dataset.i;
    console.log('此次点击的id:' + i);
  }
})
