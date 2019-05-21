// pages/compass/compass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: '--',
    angle: '--',
    rotate: '',
    backgroundColor: '#011b28',
    color: '#fff',
    compass: '../../images/compass-dark.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 罗盘Api
    var that = this;
    wx.onCompassChange(function (res) {
      // 罗盘数据保留两位小数
      var directions = res.direction.toFixed(2);
      var radios = res.direction.toFixed(0);
      that.setData({
        angle: directions,
        rotate: 360 - radios,
        direction: check(radios)
      })
    });
    // 判断手机是否有陀旋仪
    // 外部检测，如果没有陀旋仪数据，代码不会进入wx.onCompassChange
    // 必须使用setsetTimeout包裹代码，否则代码立即执行弹窗
    setTimeout(function () {
      if (that.data.direction == '--' && that.data.angle == '--') {
        wx.showToast({
          title: '无罗盘或被禁用',
          icon: 'loading',
          duration: 5000,
          mask: true
        })
      }
    }, 3000);
    // 判断文字
    function check(i) {
      if (15 <= i && i <= 75) {
        return '东北'
      } else if (75 < i && i < 105) {
        return '正东'
      } else if (105 <= i && i <= 165) {
        return '东南'
      } else if (165 < i && i < 195) {
        return '正南'
      } else if (195 <= i && i <= 255) {
        return '西南'
      } else if (255 < i && i < 285) {
        return '正西'
      } else if (285 <= i && i <= 345) {
        return '西北'
      } else {
        return '正北'
      }
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
    title: '我现在面向 ' + this.data.direction + ' 方向！',
      path: '/pages/compass/compass'
  }
  }
})