var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
const app = getApp()
var ip = app.globalData.ip

Page({
  data: {
    markers: [],
    sms: '',
    smsvoice: '',

    swiperCurrent: 0,

    indicatorDots: true,

    autoplay: true,

    interval: 3000,

    duration: 800,

    circular: true,
    imgUrls: [{
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index1.png'
      },
      {
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index2.png'
      },
      {
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index3.png'
      },
      {
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index4.png'
      },
      {
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index5.png'
      },
      {
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index6.png'
      },
      {
        // link: '/pages/index/index',
        url: 'https://jueyevip.top/index7.png'
      }

    ],
    texts: "爱心传音，拉近和她或他的距离！",
    min: 3, //最少字数
    max: 130, //最多字数 (根据自己需求改变) 

  },

  userPhoneInput: function(e) {
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
        userphone: e.detail.value
      })
    }
  },
  calling: function() {
    var userphone = this.data.userphone;
    //console.log(userphone)
    if (userphone == null || userphone == 'undefined' || userphone == '') {
      wx.showToast({
        title: '号码空或有误！',
        image: '/images/eye.png',
        duration: 2000
      })
      return;
    } else {
      wx.makePhoneCall({
        phoneNumber: this.data.userphone
      })
    }
    wx.redirectTo({
      url: '../roadtime/roadtime',
    })
  },

  orderMeetingVoice: function() {
    var that = this;
    var userphone = this.data.userphone;
    var usercontens = this.data.usercontens;
    //判断用户是否登陆
    if (app.globalData.userInfo) {
      that.setData({
        smsvoice: 'true'
      })
      console.log('缓存voicename=' + wx.getStorageSync('voicename'))
      if (wx.getStorageSync('voicename')) {
        wx.request({
          url: ip + '/getDollar', //本地服务器地址
          data: {
            openid: wx.getStorageSync('openid')
          },
          header: { //请求头
            "Content-Type": "applciation/json"
          },
          method: "GET",
          success: function(res) {
            console.log(res.data.split("?")[0])
            //判断剩余量
            if (res.data.split("?")[0] > 0) {
              wx.showToast({
                title: '正在传音......',
                duration: 2000,
              })
              wx.request({
                url: ip + '/addvoice', //本地服务器地址
                data: {
                  openid: wx.getStorageSync('openid'),
                  userphone: userphone,
                  usercontens: usercontens,
                  voicename: wx.getStorageSync('voicename')
                },
                header: { //请求头
                  "Content-Type": "applciation/json"
                },
                method: "GET",
                success: function(res) {
                  console.log("后台返回数据：" + res.data)
                  if (res.data == "恭喜传音成功！") {
                    wx.setStorageSync('voicename', '')
                    wx.showToast({
                      title: res.data,
                      duration: 3000,
                      success: function() {

                        wx.switchTab({
                          url: '../Index/Index',
                          success: function(e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.clearContents();

                          }
                        })
                        that.setData({
                          usercontens: ''
                        })
                        that.setData({
                          smsvoice: ''
                        })
                      }
                    })
                  }
                  if (res.data == "字符超出余量！") {
                    wx.showToast({
                      title: res.data,
                      duration: 3000,
                      success: function() {
                        wx.switchTab({
                          url: '../Index/Index',
                          success: function(e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;

                          }
                        })
                        that.setData({
                          smsvoice: ''
                        })
                      }
                    })
                  }
                  if (res.data == "内容有误或空！") {
                    wx.showToast({
                      title: res.data,
                      duration: 3000,
                      success: function() {

                        wx.switchTab({
                          url: '../Index/Index',
                          success: function(e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;

                          }
                        })
                        that.setData({
                          smsvoice: ''
                        })
                      }
                    })
                  }
                  if (res.data == "存在敏感词汇！") {
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
                          smsvoice: ''
                        })
                      }
                    })
                  }
                  // setTimeout(function () {
                  //   wx.hideToast()
                  // }, 3000)
                }


              })

            } else {
              wx.showModal({
                title: '温馨提示',
                content: '传音数不足，请连续打卡！',
                success: function(res) {
                  if (res.confirm) { //这里是点击了确定以后
                    wx.switchTab({
                      url: '../Mine/Mine'
                    })
                    that.setData({
                      smsvoice: ''
                    })

                  } else { //这里是点击了取消以后
                    that.setData({
                      smsvoice: ''
                    })
                  }
                }
              })
            }

          }

        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '亲，请您先留声哦！',
          success: function(res) {
            if (res.confirm) { //这里是点击了确定以后
              wx.navigateTo({
                url: '../Voice/Voice'
              })
              that.setData({
                smsvoice: ''
              })
            } else { //这里是点击了取消以后
              that.setData({
                smsvoice: ''
              })
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '亲，请您先登录才能替您传音哦！',
        success: function(res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.switchTab({
              url: '../Mine/Mine'
            })

          } else { //这里是点击了取消以后
            that.setData({
              smsvoice: ''
            })
          }
        }
      })
    }
  },
  orderMeeting: function() { //提交input信息到后台
    var userphone = this.data.userphone;
    var usercontens = this.data.usercontens;
    var that = this;
    // console.log(userphone + usercontens)

    // wx.showModal({
    //   title: '温馨提示',
    //   content: '内容不能为空！',
    //   success: function (res) {
    //     if (res.confirm) {//这里是点击了确定以后
    //     } else {//这里是点击了取消以后
    //     }
    //   }
    // })

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
        header: { //请求头
          "Content-Type": "applciation/json"
        },
        method: "GET",
        success: function(res) {
          console.log(res.data.split("?")[0])
          //判断用户短信剩余量
          if (res.data.split("?")[0] > 0) {

            wx.showToast({
              title: '传音中......',
              duration: 2000,
            })
            wx.request({
              url: ip + '/add', //本地服务器地址
              data: {
                openid: wx.getStorageSync('openid'),
                userphone: userphone,
                usercontens: usercontens
              },
              header: { //请求头
                "Content-Type": "applciation/json"
              },
              method: "GET",
              success: function(res) {
                console.log("后台传回数据：" + res.data)
                if (res.data == "恭喜传音成功！") {
                  wx.showToast({
                    title: res.data,
                    duration: 3000,
                    success: function() {
                      wx.switchTab({
                        url: '../Index/Index',
                        success: function(e) {
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
                    success: function() {
                      wx.switchTab({
                        url: '../Index/Index',
                        success: function(e) {
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
                    success: function() {
                      wx.switchTab({
                        url: '../Index/Index',
                        success: function(e) {
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
                if (res.data == "存在敏感词汇！") {
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

          } else {
            wx.showModal({
              title: '温馨提示',
              content: '传音数不足，请连续打卡！',
              success: function(res) {
                if (res.confirm) { //这里是点击了确定以后
                  wx.switchTab({
                    url: '../Mine/Mine'
                  })
                  that.setData({
                    sms: ''
                  })
                } else { //这里是点击了取消以后
                  that.setData({
                    sms: ''
                  })
                }
              }
            })
          }

        }

      })

    } else {
      wx.showModal({
        title: '温馨提示',
        content: '亲，请您先登录才能替您传音哦！',
        success: function(res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.switchTab({
              url: '../Mine/Mine'
            })

          } else { //这里是点击了取消以后
            that.setData({
              sms: ''
            })
          }
        }
      })
    }

  },
  clearContents: function(e) {
    var that = this
    that.setData({
      usercontens: '',
      userphone: ''
    })
  },
  clearall: function() {
    var that = this
    wx.showModal({
      title: '温馨提示',
      content: '您确定要清空所有记录吗？',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          that.clearContents()
          wx.setStorageSync('voicename', null)
          that.setData({
            sms: '',
            smsvoice: ''
          })
        } else { //这里是点击了取消以后

        }
      }
    })
  },

  //字数限制  
  userContentsInput: function(e) {
    this.setData({
      usercontens: e.detail.value
    })
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "加油，简单的我想你说不出来吗？"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  onShareAppMessage: function() {},
  toVoice: function() {
    //判断用户是否登陆
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../Voice/Voice'
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '亲，请您先登录才能替您传音哦！',
        success: function(res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.switchTab({
              url: '../Mine/Mine'
            })

          } else { //这里是点击了取消以后

          }
        }
      })
    }
  }
})