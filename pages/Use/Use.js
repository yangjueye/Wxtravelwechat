var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hiddenToast: true,
    imgalist: ['https://jueyevip.top/giphy.gif']
  },
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })
  },
  onLoad: function (options) {
    var that = this;
  
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },

  bindSubmit: function () {
    var that = this;
    that.setData({
      hiddenToast: false
    })
   
  },

  toastHidden: function () {
    var that = this;
    that.setData({
      hiddenToast: true
    })
    wx:wx.switchTab({
      url: '../Mine/Mine',
    })
  },

  onShow: function () {
  },
})