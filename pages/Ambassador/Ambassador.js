var app = getApp();
var ip = app.globalData.ip
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo: {},
    gg:'',
    hiddenToast: true,
    imgalist: ['https://jueyevip.top/qiang1.png', 'https://jueyevip.top/qiang2.png', 'https://jueyevip.top/qiang3.png', 'https://jueyevip.top/qiang4.png' ]
  },//'/images/zly4.jpg'
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })
  },
  onLoad: function (options) {
    var that = this;
    that.getGg()
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onShow: function () {
    var that=this
    that.getGg()
  },
  getGg: function () {
    var that = this
    wx.request({
      url: app.globalData.ip + '/getGg', //这里是本地请求路径,可以写你自己的本地路径,也可以写线上环境
      data: {
      },
      success: function (res) {
        that.setData({
          gg: res.data
        })
        // console.log(wx.getStorageSync('openid'))
        // console.log(this.globalData.openid)
      }
    })
  }
})