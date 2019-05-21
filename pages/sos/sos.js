var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
  },
  onLoad: function () {
  },
  toSoscall: function (e) {
    wx.navigateTo({
      url: '../soscall/soscall',
    })
  },
  toSoslocation: function (e) {
    wx.navigateTo({
      url: '../soslocation/soslocation',
    })
  },
  toSosphoto: function (e) {
    wx.navigateTo({
      url: '../sosphoto/sosphoto',
    })
  },
  toCarnum: function (e) {
    wx.navigateTo({
      url: '../carnum/carnum',
    })
  },
  toCompass: function (e) {
    wx.navigateTo({
      url: '../compass/compass',
    })
  },
  toPhone: function (e) {
    wx.navigateTo({
      url: '../phone/phone',
    })
  },

  onShareAppMessage: function () {
  },
})
