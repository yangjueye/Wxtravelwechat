const app = getApp()
var ip = app.globalData.ip
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usercode: '',
    codetext: '',
    isError: false,
    errorText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 输入验证码
   */
  userCodeInput: function (e) {
    //正则判断号
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '验证码为空',
        image: '/images/eye.png',
        duration: 1000
      })
      return;
    } else if (e.detail.value.length < 6) {
      wx.showToast({
        title: '长度有误！',
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
        usercode: e.detail.value,
        isError: false,
        errorText: ''
      })
      that.submit()
    }
  },

  submit: function (item) {
    var that = this;
    if (this.data.usercode === '') {
      this.setData({
        isError: true,
        errorText: "验证码不能为空"
      })
      return;
    }
    // that.setData({
    //   codetext: '显示所啊但是发射点发射点发射点发射点发射点阿斯顿发射点啊手动阀手动阀啊打发士大夫阿迪斯法大师傅打发手动阀啥大事发生阿迪斯发的是'
    // })
    wx.request({
      url: ip + '/showvoicecode',
      data: {
        usercode: this.data.usercode,
        type:1
      },
      method: "GET",
      success: function (res) {
        console.log("后台返回数据：" + res.data)
       
       that.setData({
         codetext: res.data
       })
      
      },
      fail: function (item) {

      },
      complete: function (item) {

      }
    })

  },
iswho:function(){
  var that = this;
  if (this.data.usercode === '') {
    this.setData({
      isError: true,
      errorText: "验证码不能为空"
    })
    return;
  }
  wx.request({
    url: ip + '/showvoicecode',
    data: {
      usercode: that.data.usercode,
      type:2
    },
    method: "GET",
    success: function (res) {
      console.log("后台返回数据：" + res.data)
      wx.showModal({
        title: '她/他的微信昵称',
        content: res.data,
        showCancel:false,
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
          }
        }
      })
     

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

 