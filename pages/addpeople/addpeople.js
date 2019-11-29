const app = getApp()
var ip = app.globalData.ip
Page({
  /* 设置初始值 */
  data: {
    communications: [],
  },
  /* 窗口加载事件 */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      //console.log(wx.getStorageSync('openid'))
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
        //console.log("后台返回数据："+res.data);
        if (res.data.length==0){
          //console.log("后台返回数据空");
          wx.redirectTo({
            url: '../addpeopleinfo/addpeopleinfo',
          })
        }
        that.setData({
          communications: res.data
        })
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '亲，请您先登录才能绑定哦！',
        showCancel:false,
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.switchTab({
              url: '../Mine/Mine'
            })
          } 
        }
      })
    }

  },

  communicationsTab: function (e) {
    // let i = e.target.dataset.i;
    // console.log('此次点击的id:' + i);
    wx.showModal({
      title: '温馨提示',
      content: '请问是否删除重新添加？',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          wx.request({
            url: ip + '/addpeople',
            data: {
              openid: wx.getStorageSync('openid'),
              type:"delete"
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              //console.log("后台返回数据："+res.data);
              if (res.data == "删除成功！") {
                //console.log("后台返回数据空");
                wx.redirectTo({
                  url: '../addpeopleinfo/addpeopleinfo',
                })
              }
            },
            fail: function (res) {
              console.log(".....fail.....");
            }
          })

        } else { //这里是点击了取消以后
          // that.setData({
          //   smsvoice: ''
          // })
          wx.switchTab({
            url: '../Mine/Mine',
          })
        }
      }
    })
  }
})
