var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    userphone:'',
    textData: {}
  },
  onLoad: function () {
    var that = this;
    that.getUserPhone()
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
    if (that.data.userphone != null && that.data.userphone != 'undefined' && that.data.userphone != '') {
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      success: function (lodata) {
        console.log(lodata[0].name)
        var usercontens = '您的收到一条来自微信好友的紧急定位救助信息-->' + lodata[0].name + lodata[0].desc+'，请尽快联系好友确认是否需要帮助，以免耽误最佳时机！';
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
                    userphone: that.data.userphone,
                    usercontens: usercontens
                  },
                  header: {//请求头
                    "Content-Type": "applciation/json"
                  },
                  method: "GET",
                  success: function (res) {
                     console.log("后台返回数据："+res.data)
                    if (res.data == "恭喜传音成功！") {
                      wx.showToast({
                        title: res.data,
                        duration: 3000,
                        success: function () {

                          wx.switchTab({
                            url: '../soslocation/soslocation',
                            success: function (e) {
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
    }
  },
  soscall: function () {
    var that = this;
    if (that.data.userphone != null && that.data.userphone != 'undefined' && that.data.userphone != ''){
    wx.makePhoneCall({
      phoneNumber: that.data.userphone// 仅为示例，并非真实的电话号码
    })}
  },
  getUserPhone:function(){
    var that = this;
    wx.request({
      url: ip + '/communication',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("后台返回数据："+res.data.length);
        if (res.data.length==0) {
          wx.showModal({
            title: '请您先添加紧急联系人！',
            content: res.data,
            showCancel: false,
            success: function (res) {
              if (res.confirm) { //这里是点击了确定以后
                wx.redirectTo({
                  url: '../addpeopleinfo/addpeopleinfo',
                })
                return
              }
            }
          })
        
        } else {
        that.setData({
          userphone: res.data[0].string2
        })}
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  }
})