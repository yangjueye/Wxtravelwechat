//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    year: 2017,
    userInfo: {}
  },

  goToIndex: function () {
    wx.switchTab({
      url: '/pages/weather/weather',
    });
  },
  onLoad: function () {
    this.setData({
      year: new Date().getFullYear()
    });
  },
  onShow: function () {
    console.log('onLoad')
    var that = this
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (!userInfo) {
      wx.switchTab({
    
        url: "/pages/Mine/Mine"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
    // app.getUserInfo(function (userInfo) {
    //   console.log('userInfo')
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onShareAppMessage: function () {
  },
});