// pages/soscall/soscall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  call1:function(){
  wx.makePhoneCall({
    phoneNumber: '110' // 仅为示例，并非真实的电话号码
  })
  },
  call2: function () {
    wx.makePhoneCall({
      phoneNumber: '119' // 仅为示例，并非真实的电话号码
    })
  },
  call3: function () {
    wx.makePhoneCall({
      phoneNumber: '122' // 仅为示例，并非真实的电话号码
    })
  },
  call4: function () {
    wx.makePhoneCall({
      phoneNumber: '120' // 仅为示例，并非真实的电话号码
    })
  },
  call5: function () {
    wx.makePhoneCall({
      phoneNumber: '12395' // 仅为示例，并非真实的电话号码
    })
  },
  call6: function () {
    wx.makePhoneCall({
      phoneNumber: '12119' // 仅为示例，并非真实的电话号码
    })
  },
  call7: function () {
    wx.makePhoneCall({
      phoneNumber: '12122' // 仅为示例，并非真实的电话号码
    })
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