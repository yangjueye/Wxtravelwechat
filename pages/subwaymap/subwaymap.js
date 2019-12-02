// pages/subwaymap/subwaymap.js
const app = getApp()
var ip = app.globalData.ip
var id = 123
// let plugin = requirePlugin("subway");
// let key = 'TMTBZ-PKE35-YILI3-QA3BP-AXV6V-LYBU7';  //使用在腾讯位置服务申请的key
// let referer = 'ITravel智能出行家';   //调用插件的app的名称
Page({

  /**
   * 页面的初始数据
   */
  data: {

   url: ip + '/subwaymap.html'
 
   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.navigateTo({
    //   url: 'plugin://subway/index?key=' + key + '&referer=' + referer
    // });
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

  }
})