var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      iconPath: "../../images/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })
  },
  sos: function () {
    var that = this;
   // var userphone = this.data.userphone;
    var userphone = '15533532322';
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      success: function (lodata) {
        console.log(lodata[0].name)
        var usercontens = '紧急定位救助-->' + lodata[0].name + lodata[0].desc;
        //判断用户是否登陆
        if (app.globalData.userInfo) {
          that.setData({
            sms: 'true'
          })
          console.log('缓存openid=' + wx.getStorageSync('openid'))
          wx.request({
            url: ip + '/getDollar', //本地服务器地址
            data: {
              openid: wx.getStorageSync('openid')
            },
            header: {//请求头
              "Content-Type": "applciation/json"
            },
            method: "GET",
            success: function (res) {
              console.log(res.data.split("?")[0])
              //判断用户短信剩余量
              if (res.data.split("?")[0] > 0) {

                wx.showToast({
                  title: '发送中......',
                  duration: 2000,
                })
                wx.request({
                  url: ip + '/add', //本地服务器地址
                  data: {
                    openid: wx.getStorageSync('openid'),
                    userphone: userphone,
                    usercontens: usercontens
                  },
                  header: {//请求头
                    "Content-Type": "applciation/json"
                  },
                  method: "GET",
                  success: function (res) {
                    // console.log(res.data)
                    if (res.data == "紧急发送成功！") {
                      wx.showToast({
                        title: res.data,
                        duration: 3000,
                        success: function () {

                          wx.switchTab({
                            url: '../sos/sos',
                            success: function (e) {
                              var page = getCurrentPages().pop();
                              if (page == undefined || page == null) return;
                              page.clearContents();

                            }
                          })
                          that.setData({
                            usercontens: ''
                          })
                          that.setData({
                            sms: ''

                          })
                        }
                      })
                    }
                    if (res.data == "字符超出余量！") {
                      wx.showToast({
                        title: res.data,
                        duration: 3000,
                        success: function () {
                          wx.switchTab({
                            url: '../Index/Index',
                            success: function (e) {
                              var page = getCurrentPages().pop();
                              if (page == undefined || page == null) return;

                            }
                          })
                          that.setData({
                            sms: ''
                          })
                        }
                      })
                    }
                    if (res.data == "内容有误或空！") {
                      wx.showToast({
                        title: res.data,
                        duration: 3000,
                        success: function () {

                          wx.switchTab({
                            url: '../Index/Index',
                            success: function (e) {
                              var page = getCurrentPages().pop();
                              if (page == undefined || page == null) return;

                            }
                          })
                          that.setData({
                            sms: ''
                          })
                        }
                      })
                    }
                    // setTimeout(function () {
                    //   wx.hideToast()
                    // }, 3000)
                  }


                })

              }
              else {
                wx.showModal({
                  title: '温馨提示',
                  content: '余额不足，请连续打卡！',
                  success: function (res) {
                    if (res.confirm) {//这里是点击了确定以后
                      wx.switchTab({
                        url: '../Mine/Mine'
                      })
                      that.setData({
                        sms: ''
                      })
                    } else {//这里是点击了取消以后
                      that.setData({
                        sms: ''
                      })
                    }
                  }
                })
              }

            }

          })

        }
        else {
          wx.showModal({
            title: '温馨提示',
            content: '亲，请您先登录哦！',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                wx.switchTab({
                  url: '../Mine/Mine'
                })

              } else {//这里是点击了取消以后
                that.setData({
                  sms: ''
                })
              }
            }
          })
        }

      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })
  },
  soscall: function () {
    wx.makePhoneCall({
      phoneNumber: '1**********' // 仅为示例，并非真实的电话号码
    })
  },
})