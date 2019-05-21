// pages/phone/phone.js
const innerAudioContext = wx.createInnerAudioContext()
var status=false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alpha: '0',
    screen: '正面',
    imagePath:''
  },
  //开始监听屏幕方向
  startScreenClick: function () {
    var that =this;
    wx.startDeviceMotionListening({
      success: function (e) {
       // console.log(e);
      }
    });
     wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解除警报',
      success(res) {
       // console.log(res)
        that.endScreenClick();
      },
       fail(res) {
         const ctx = wx.createCameraContext()
         ctx.takePhoto({
           quality: 'high',
           success: (res) => {
             that.setData({
               imagePath: res.tempImagePath
             })
           },
           fail: (res) => {
             console.log(res)
           }
         })
       }
    });
  },
  //结束监听屏幕方向
  endScreenClick: function () {
    var that=this;
    status = false; 
    that.audioPause();
    wx.stopDeviceMotionListening({
      success: function (e) {
       
      },
      fail(e) {
    //    console.log(e);
      }
    })
  },
  //设置屏幕亮度
  setscreenbright(){
    wx.setScreenBrightness({
     
        value: 0,    //屏幕亮度值，范围 0~1，0 最暗，1 最亮
      
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
    this.ctx = wx.createCameraContext()
  //  var that = this;

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
      //   wx.vibrateLong()
      // }
      if (beta<110 && beta>90){
        //  this.endScreenClick()
        //  wx.vibrateShort({
        //      success: function () {
        //        // console.log(e);
        //      }
        //    })
        status=true;
       

       }
      if (status) {
        if (beta < 40 ) { that.audioPlay(); wx.vibrateLong(); }
    //     else{
    //         wx.startSoterAuthentication({
    //   requestAuthModes: ['fingerPrint'],
    //   challenge: '123456',
    //   authContent: '请用指纹解除警报',
    //   success(res) {
    //     status = false; that.audioPause();that.endScreenClick();
    //   },
    //    fail(res) {


    //    }
    // });
    //      }
      }
      // console.log('alpha'+alpha)
       console.log('beta'+beta)
      // console.log('gamma'+gamma)
      // this.setData({
      //   alpha: beta
      // })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  
  },
 
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
function takephoto(that) {
  

  that.ctx.takePhoto({
    quality: 'high',
    success: (res) => {
      that.setData({
        imagePath: res.tempImagePath
      })
    },
    fail: (res) => {
      console.log(res)
    }
  })
}