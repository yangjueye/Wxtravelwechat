var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
  },
  onLoad: function () {
  },
  toCarnum: function (e) {
    wx.navigateTo({
      url: '../carnum/carnum',
    })
  },
 

  onShareAppMessage: function () {
  },
})
