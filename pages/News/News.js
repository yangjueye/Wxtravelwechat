var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    news: '',
    hiddenToast: true,
    imgalist: ['https://jueyevip.top/new1.png', 'https://jueyevip.top/new2.png', 'https://jueyevip.top/new3.png', 'https://jueyevip.top/new4.png', 'https://jueyevip.top/new5.png']
  },
  previewImage: function(e) {
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })
  },

  onLoad: function(options) {
    var that = this;
    that.getNews()
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },

  bindSubmit: function() {
    var that = this;
    that.setData({
      hiddenToast: false
    })
  },

  toastHidden: function() {
    var that = this;
    that.setData({
      hiddenToast: true
    })
    wx: wx.switchTab({
      url: '../Mine/Mine',
    })
  },
  getNews: function() {
    var that = this
    wx.request({
      url: app.globalData.ip + '/getNews', //这里是本地请求路径,可以写你自己的本地路径,也可以写线上环境
      data: {},
      success: function(res) {
        that.setData({
          news: res.data
        })
        // console.log(wx.getStorageSync('openid'))
        // console.log(this.globalData.openid)
      }
    })
  },
  onShow: function() {
    var that = this
    that.getNews()
  },
})