const app = getApp()
var ip = app.globalData.ip
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pname: '',
    isError: false,
    errorText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 输入手机号
   */
  userPhoneInput: function (e) {
    //正则判断手机号
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '手机号为空',
        image: '/images/eye.png',
        duration: 1000
      })
      return;
    } else if (e.detail.value.length < 11) {
      wx.showToast({
        title: '长度有误！',
        image: '/images/eye.png',
        duration: 1000
      })
      return;
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号有误！',
        image: '/images/eye.png',
        duration: 1000
      })
      return;
    } else {
      wx.showToast({
        title: '填写正确',
        icon: 'success',
        duration: 1500
      })
      this.setData({
        phone: e.detail.value
      })
    }
  },

  /**
 * 输入姓名
 */
  bindpnameInput: function (item) {
    this.setData({
      pname: item.detail.value
    })
  },


  /**
 * 点击保存按钮
 */
  savepeople: function (item) {
    var that = this;
    if (this.data.phone === '' || this.data.pname === '') {
      this.setData({
        isError: true,
        errorText: "手机号码或姓名不能为空"
      })
      return;
    }
    wx.request({
      url: ip + '/addpeople',
      data: {
        openid: wx.getStorageSync('openid'),
        phone: this.data.phone,
        pname: this.data.pname,
        type:"add"
      },
      method: "GET",
      success: function (res) {
        console.log("后台返回数据："+res.data)
        if (res.data == "添加成功！") {
          wx.redirectTo({
            url: '../addpeople/addpeople',
          });
        } else {
          that.setData({
            isError: true,
            errorText: "出现错误,请重新操作！有问题请联系客服。"
          })
        }
      },
      fail: function (item) {

      },
      complete: function (item) {

      }
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