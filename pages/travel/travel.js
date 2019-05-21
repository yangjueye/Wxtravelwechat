var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
    // markers: [],
    // latitude: '',
    // longitude: '',
    // textData: {}
  },
  onLoad: function () {
    // var that = this;
    // var key = config.Config.key;
    // var myAmapFun = new amapFile.AMapWX({ key: key });
    // myAmapFun.getRegeo({
    //   iconPath: "../../images/marker.png",
    //   iconWidth: 22,
    //   iconHeight: 32,
    //   success: function (data) {
    //     var marker = [{
    //       id: data[0].id,
    //       latitude: data[0].latitude,
    //       longitude: data[0].longitude,
    //       iconPath: data[0].iconPath,
    //       width: data[0].width,
    //       height: data[0].height
    //     }]
    //     that.setData({
    //       markers: marker
    //     });
    //     that.setData({
    //       latitude: data[0].latitude
    //     });
    //     that.setData({
    //       longitude: data[0].longitude
    //     });
    //     that.setData({
    //       textData: {
    //         name: data[0].name,
    //         desc: data[0].desc
    //       }
    //     })
    //   },
    //   fail: function (info) {
    //     // wx.showModal({title:info.errMsg})
    //   }
    // })

  },
  toDestinationsearch: function (e) {
    wx.navigateTo({
      url: '../destinationsearch/destinationsearch',
    })
  },
  toRounds: function (e) {
    wx.navigateTo({
      url: '../Rounds/Rounds',
    })
  },
  toRoadpredict: function (e) {
    wx.navigateTo({
      url: '../roadpredict/roadpredict',
    })
  },
  toSubwaymap: function (e) {
    wx.navigateTo({
      url: '../subwaymap/subwaymap',
    })
  },
  toIndoormap: function (e) {
    wx.navigateTo({
      url: '../indoormap/indoormap',
    })
  },
  
  onShareAppMessage: function () {
  },
})
