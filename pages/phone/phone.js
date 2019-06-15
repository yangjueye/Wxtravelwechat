// pages/phone/phone.js
const innerAudioContext = wx.createInnerAudioContext()
var status=false;
var time = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beta: '0',
    screen: '正北',
    imagePath:''
  },
  //定时器拍照
  setTime: function () {
    let that = this
    let ctx = wx.createCameraContext()
    time = setInterval(function () {
      if (Math.round(Math.random()) == 1) {
       // console.log('拍照')
        //拍照
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            console.log(res.tempImagePath)
            that.setData({
              imagePath: res.tempImagePath
            })
           
          }
        })
      }
    }, 1000 * 2) //循环间隔 单位ms
  },
  //开始监听屏幕方向
  startScreenClick: function () {
    var that =this;
    that.setTime();
    that.setscreenblack();
    wx.startDeviceMotionListening({
      success: function (e) {
       // console.log(e);
      }
    });
    //  wx.startSoterAuthentication({
    //   requestAuthModes: ['fingerPrint'],
    //   challenge: '123456',
    //   authContent: '请用指纹解除警报',
    //   success(res) {
    //    // console.log(res)
    //     that.endScreenClick();
    //   },
    //    fail(res) {
    //      that.setTime();
    //    }
    // });
  },
  //结束监听屏幕方向
  endScreenClick: function () {
    var that=this;
    status = false; 
    that.audioPause();
    that.setscreenbright();
  clearInterval(time);
    wx.stopDeviceMotionListening({
      success: function (e) {
       
      },
      fail(e) {
    //    console.log(e);
        that.endScreenClick();
        
      }
    })
  },
  //设置屏幕最暗
  setscreenblack(){
    wx.setScreenBrightness({
        value: 0,    //屏幕亮度值，范围 0~1，0 最暗，1 最亮  
    })
   
    // wx.getScreenBrightness({
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  //设置屏幕最亮
  setscreenbright() {
    wx.setScreenBrightness({
      value: 1,    //屏幕亮度值，范围 0~1，0 最暗，1 最亮  
    })

    // wx.getScreenBrightness({
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this;

    // alpha  number  当 手机坐标 X / Y 和 地球 X / Y 重合时，绕着 Z 轴转动的夹角为 alpha，范围值为[0, 2 * PI) 。逆时针转动为正。
    wx.onDeviceMotionChange(function (res) {
      var alpha = parseFloat(res.alpha);
      var beta= parseFloat(res.beta);
      var gamma =parseFloat(res.gamma);
      // if (alpha > 45 && alpha < 136) {
      //   that.setData({ screen: '左侧' })
      // } else if (alpha > 225 && alpha < 316) {
      //   that.setData({ screen: '右侧' })
      // } else if (alpha > 135 && alpha < 226) {
      //   that.setData({ screen: '反面' })
      // } else {
      //   that.setData({ screen: '正面' })
      // }
      if (15 <= alpha && alpha <= 75) {
        that.setData({ screen: '东北' })
      } else if (75 < alpha && alpha < 105) {
        that.setData({ screen: '正东' })
      } else if (105 <= alpha && alpha <= 165) {
        that.setData({ screen: '东南' }) 
      } else if (165 < alpha && alpha < 195) {
        that.setData({ screen: '正南' }) 
      } else if (195 <= alpha && alpha <= 255) {
        that.setData({ screen: '西南' }) 
      } else if (255 < alpha && alpha < 285) {
        that.setData({ screen: '正西' })
      } else if (285 <= alpha && alpha <= 345) {
        that.setData({ screen: '西北' }) 
      } else {
        that.setData({ screen: '正北' }) 
      }
      if (beta<110 && beta>90){
        status=true;
       }
      if (status) {
        if (beta < 40 ) { that.audioPlay(); wx.vibrateLong(); }
      }
      // console.log('alpha'+alpha)
      // console.log('beta'+beta)
      // console.log('gamma'+gamma)
       that.setData({
         alpha:alpha,
         beta: beta
       })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //警报声
  audioPlay: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'music/sos.mp3'
    innerAudioContext.volume=1
    innerAudioContext.onPlay(() => {
     // console.log('开始播放')
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  audioPause: function () {
    innerAudioContext.stop(() => {
      console.log('停止')
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
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
