var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function(e) {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getDrivingRoute({
      origin: e.start,
      destination: e.end,
      success: function(data){
        console.log('驾车成功详情' + data)
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        }
          
      },
      fail: function(info){
        console.log('驾车失败详情' + info)
        wx.showToast({
          title: '暂无路线！',
          image: '/images/live.png',
          duration: 2000
        })
      }
    })
  }
})