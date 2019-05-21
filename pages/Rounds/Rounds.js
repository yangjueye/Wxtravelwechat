var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
    
  },
  onLoad: function () {
   

  }, 
  toRoadtime: function (e) {
    wx.navigateTo({
      url: '../roadtime/roadtime',
    })
  },
  toPanoramicrotate: function(e) {
    wx.navigateTo({
      url: '../panoramicrotate/panoramicrotate',
    })
  },
  toPanoramicmap: function (e) {
    wx.navigateTo({
      url: '../panoramicmap/panoramicmap',
    })
  },
  toSearchrounds: function (e) {
    wx.navigateTo({
      url: '../searchrounds/searchrounds',
    })
  },
  toBus: function (e) {
    wx.navigateTo({
      url: '../bus/bus',
    })
  },

  toCar: function (e) {
    wx.navigateTo({
      url: '../car/car',
    })
  },

  toGas: function (e) {
    wx.navigateTo({
      url: '../gas/gas',
    })
  },

  toCharge: function (e) {
    wx.navigateTo({
      url: '../charge/charge',
    })
  },

  toShop: function (e) {
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  toFood: function (e) {
    wx.navigateTo({
      url: '../food/food',
    })
  },
  toPharmacy: function (e) {
    wx.navigateTo({
      url: '../pharmacy/pharmacy',
    })
  },
  toWc: function (e) {
    wx.navigateTo({
      url: '../wc/wc',
    })
  },
  onShareAppMessage: function () {
  },
})
