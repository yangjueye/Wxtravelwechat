//index.js
//获取应用实例
const app = getApp()
var ip = app.globalData.ip
Page({
  data: {
    mottoa: '私信助手@',
    mottou: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //传音次数
    dollar:0,
    //幸运星
    stars:0,
    //连续签到天数
    sign:0,
    uid:'',
    hiddenToast: true,
    disabled:''
   
  },
  toastHidden: function () {
    var that = this;
    that.setData({
      hiddenToast: true
    })
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 onShow:function(){
   var that=this
   if (app.globalData.userInfo) {
     this.getUserDollar();
   }  
  //  setTimeout(function () {
  //    that.onShow()
  //  }, 100000)
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
       //var olddate = new Date(wx.getStorageSync('signtime'))
       var olddate = new Date(res.data.split("?")[4])
       var myOlddate = olddate.getFullYear() + '-' + (olddate.getMonth() + 1) + '-' + olddate.getDate()
       console.log(myOlddate)
       var date = new Date();
       var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      var uodate=new Date(myOlddate)
      var undate=new Date(myDate)
       var result = (undate - uodate) / (1000 * 60 * 60 * 24)
       console.log('result=', result)
       if (result> 0) {
         that.setData({
           disabled: ''
         })
       }
       if (result ==0){
         that.setData({
           disabled: 'true'
         })
       }
     },
   })
   

 },
  onLoad: function () {
    // wx.startSoterAuthentication({
    //   requestAuthModes: ['fingerPrint'],
    //   challenge: '123456',
    //   authContent: '请用指纹解锁',
    //   success(res) {
    //     console.log(res)
    //   }
    // });
    var that = this;
 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
     
     
      this.getUserDollar();
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
       
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.getUserDollar();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
         
        }
      })
      this.getUserDollar();
    }
  },
  //获取用户登陆授权
  getUserInfo: function(e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showToast({
        title: '蓝瘦',
        image: '/images/live.png',
        duration: 2000
      })
    }else{
      wx.redirectTo
        ({
          url: "/pages/start/start"
        })
        var that = this;
        app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', e.detail.userInfo)
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
    wx.request({
      url: ip+'/getOpenId', //这里是本地请求路径,可以写你自己的本地路径,也可以写线上环境
      data: {
        code: app.globalData.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
        headurl: app.globalData.userInfo.avatarUrl,//这些是用户的基本信息
        nickname: app.globalData.userInfo.nickName,//获取昵称
        sex: app.globalData.userInfo.gender,//获取性别
        country: app.globalData.userInfo.country,//获取国家
        province: app.globalData.userInfo.province,//获取省份
        city: app.globalData.userInfo.city,//获取城市
      },
      success: function (res) {
        wx.setStorageSync('openid', res.data)
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
            var olddate = new Date(res.data.split("?")[4])
            var myOlddate = olddate.getFullYear() + '-' + (olddate.getMonth() + 1) + '-' + olddate.getDate()
            var date = new Date();
            var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            var uodate = new Date(myOlddate)
            var undate = new Date(myDate)
            var result = (undate - uodate) / (1000 * 60 * 60 * 24)
            console.log('result=', result)
            if (result > 0) {
              that.setData({
                disabled: ''
              })
            }
            if (result == 0) {
              that.setData({
                disabled: 'true'
              })
            }
            that.setData({
              dollar: res.data.split("?")[0],
              stars: res.data.split("?")[1],
              uid: res.data.split("?")[2],
              sign: res.data.split("?")[3],
              mottou: res.data.split("?")[5]
            });
            
          },
        })
      }
    })
   
    }
  },
  //签到打卡按钮
  sign:function(){
    var that = this;
    that.setData({
      disabled: 'true'
    })
    var date = new Date();
    var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    wx.request({
      url: ip + '/getSign', 
      data: {
        openid: wx.getStorageSync('openid'),
       
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        that.getUserDollar()
      
        wx.showToast({
          title: '签到成功！',
          icon: 'success',
          duration: 1500
        })
      },
    })
  },
  //后台返回各项刷新数据
 getUserDollar: function () {
   var that = this;
   wx.request({
     url: ip +'/getDollar', //本地服务器地址
     data: { 
       openid: wx.getStorageSync('openid')
     },
     header: {//请求头
       "Content-Type": "applciation/json"
     },
     method: "GET",
     success: function (res) {
       var olddate = new Date(res.data.split("?")[4])
       var myOlddate = olddate.getFullYear() + '-' + (olddate.getMonth() + 1) + '-' + olddate.getDate()
       var date = new Date();
       var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
       var uodate = new Date(myOlddate)
       var undate = new Date(myDate)
       var result = (undate - uodate) / (1000 * 60 * 60 * 24)
       console.log('result=', result)
       if (result > 0) {
         that.setData({
           disabled: ''
         })
       }
       if (result == 0) {
         that.setData({
           disabled: 'true'
         })
       }
       that.setData({
         dollar: res.data.split("?")[0],
         stars: res.data.split("?")[1],
         uid: res.data.split("?")[2],
         sign: res.data.split("?")[3],
         mottou: res.data.split("?")[5]
       });
       if (res.data.split("?")[3]==0){
         that.setData({
           disabled: ''
         })
       }
     },
   })

 },

 //活动通知
  toNews: function (e) {
    wx.navigateTo({
      url: '../News/News',
    })
  },
  //添加紧急联系人
  toAddpeople: function (e) {
    wx.navigateTo({
      url: '../addpeople/addpeople',
    })
  },
  //幸运星排行榜
  toStarsRank: function (e) {
    wx.navigateTo({
      url: '../StarsRank/StarsRank',
    })
  },
  //传音墙
  toAmbassador: function (e) {
    wx.navigateTo({
      url: '../Ambassador/Ambassador',
    })
  },
  toJoin: function (e) {
    wx.navigateTo({
      url: '../join/join',
    })
  },
  //留声征集
  toVoice: function (e) {
    wx.navigateTo({
      url: '../Voice/Voice',
    })
  },
  //历史纪录
  toHistory: function (e) {
    wx.navigateTo({
      url: '../History/History',
    })
  },
 //用户须知
  toUse: function (e) {
    wx.navigateTo({
      url: '../Use/Use',
    })
  },
  //增加传音
  startocash:function(){
  var that = this;
  that.setData({
    hiddenToast: false
  })
  },
  //打卡兑换
  signtocash: function () {
    var that = this;
    wx.request({
      url: ip + '/toDollar',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        wx.showToast({
          title: res.data,
          duration: 1000,
          success: function () {
          }
        })
        that.getUserDollar()
      },
    })
  },
  onShareAppMessage: function () {
  },
  //刷新返回数据
  onPullDownRefresh: function () {
    // 动态设置导航条标题
    wx.setNavigationBarTitle({
      title: '获取数据.......'
    });
    wx.showNavigationBarLoading();
   
    //获取传音次数
    this.getUserDollar();
      wx.hideNavigationBarLoading();                   //完成停止加载
      // 动态设置导航条标题
      wx.setNavigationBarTitle({
        title: '我的'
      });
      wx.stopPullDownRefresh();                       //停止下拉刷新
  }
  
})
