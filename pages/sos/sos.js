var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
  },
  onShow:function(){
    let userInfo = wx.getStorageSync('userInfo')
    // console.log(userInfo)
    if (!userInfo) {
      wx.showModal({
        title: '温馨提示',
        content: '亲，请您先登录才能使用应急功能哦！',
        showCancel:false,
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.switchTab({
              url: '../Mine/Mine'
            })

          }
        }
      })
    }
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
  toChat: function (e) {
    wx.navigateTo({
      url: '../chat/chat',
    })
  },
  onShareAppMessage: function () {
  },
})
