var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
  },
  onLoad: function () {
  },
  toHumananalysis: function (e) {
    wx.navigateTo({
      url: '../humananalysis/humananalysis',
    })
  },
  toPortraitsegmentation: function (e) {
    wx.navigateTo({
      url: '../portraitsegmentation/portraitsegmentation',
    })
  },
  toHumannumber: function (e) {
    wx.navigateTo({
      url: '../humannumber/humannumber',
    })
  },
  toCartype: function (e) {
    wx.navigateTo({
      url: '../cartype/cartype',
    })
  },
  toCarnum: function (e) {
    wx.navigateTo({
      url: '../carnum/carnum',
    })
  },
  toDriveanalysis: function (e) {
    wx.navigateTo({
      url: '../driveanalysis/driveanalysis',
    })
  },
  toGeneralobject: function (e) {
    wx.navigateTo({
      url: '../generalobject/generalobject',
    })
  },
  toLandmark: function (e) {
    wx.navigateTo({
      url: '../landmark/landmark',
    })
  },
  toPlant: function (e) {
    wx.navigateTo({
      url: '../plant/plant',
    })
  },
  toAnimal: function (e) {
    wx.navigateTo({
      url: '../animal/animal',
    })
  },
  toFruitvegetable: function (e) {
    wx.navigateTo({
      url: '../fruitvegetable/fruitvegetable',
    })
  },
  toDishes: function (e) {
    wx.navigateTo({
      url: '../dishes/dishes',
    })
  },
  toRedwine: function (e) {
    wx.navigateTo({
      url: '../redwine/redwine',
    })
  },
  toGoodsratio: function (e) {
    wx.navigateTo({
      url: '../goodsratio/goodsratio',
    })
  },
  onShareAppMessage: function () {
  },
})
