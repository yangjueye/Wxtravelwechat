var bmap = require('../../resources/map/bmap-wx.js');

Page({
  data: {
    roadData: ''
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://api.map.baidu.com/traffic/v1/road?road_name=海宁路&city=秦皇岛市&ak=uvwZPfuqzS4eCYRf4V3MgizP7tpvG67Y', 
      success: function (res) {
        console.log(res)
        that.setData({
          //roadData: res.data.road_traffic[0].road_name
          //roadData: res.data.road_traffic[0].congestion_sections[0].speed
          roadData: res.data.description
        })
      }
    }),
      wx.request({
      url: 'http://lbsyun.baidu.com/jsdemo.htm#g0_3',
      method:"POST",
      header:{'content-type':'application/x-www-from-urlencoded'},
        success: function (res) {
          console.log(res)
         var article = res.data.html;
         WxParse.wxParse("article","html",article,that,0)
        }
      })


  }


})