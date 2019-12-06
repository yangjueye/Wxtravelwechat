
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that=this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // console.log(res.code)
          this.globalData.code = res.code
          wx.getUserInfo({
            success: function (res_user) {
              wx.request({
                url: that.globalData.ip + '/getOpenId', //这里是本地请求路径,可以写你自己的本地路径,也可以写线上环境
                data: {
                  code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                  headurl: res_user.userInfo.avatarUrl,//这些是用户的基本信息
                  nickname: res_user.userInfo.nickName,//获取昵称
                  sex: res_user.userInfo.gender,//获取性别
                  country: res_user.userInfo.country,//获取国家
                  province: res_user.userInfo.province,//获取省份
                  city: res_user.userInfo.city,//获取城市
                },
                success: function (res) {
                  wx.setStorageSync('openid', res.data)
                  that.globalData.openid = res.data
                }
              })
            }
          })
        }
      }
    }),
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })

          }

        }
      })
  },
  globalData: {
    userInfo: null,
    code:null,
    openid:null,
  //  ip: 'https://jueyevip.top/WxTravel'
    ip:'http://localhost:8080/WxTravel'
  }
})